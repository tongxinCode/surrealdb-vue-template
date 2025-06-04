-- 如果命名空间存在，则删除（级联删除其下的数据库和表）
REMOVE NAMESPACE IF EXISTS test;

-- 定义命名空间
DEFINE NAMESPACE test;

-- 使用命名空间
USE NAMESPACE test;

-- 如果数据库存在，则删除（确保在命名空间下操作）
REMOVE DATABASE IF EXISTS test;

-- 定义数据库
DEFINE DATABASE test;

-- 使用数据库
USE DATABASE test;

DEFINE ACCESS Auth ON DATABASE TYPE RECORD

    SIGNUP (
      CREATE Users SET email=$email, password=crypto::argon2::generate($password)
    )

    SIGNIN (
      SELECT * FROM Users WHERE
      email = $email
      AND crypto::argon2::compare(password, $password)
    )
    
    DURATION FOR TOKEN 15m, FOR SESSION 12h; 

DEFINE TABLE Profiles SCHEMAFULL
    PERMISSIONS
        FOR select FULL 
        FOR update, delete WHERE user = $auth.id OR $auth.role = roles:admin;

DEFINE FIELD username ON TABLE Profiles TYPE string;
DEFINE FIELD user ON TABLE Profiles TYPE record<Users>;

DEFINE INDEX profileUsernameIndex ON TABLE Profiles COLUMNS username UNIQUE;
CREATE roles:admin SET name = "Administrator";
CREATE roles:normal SET name = "Normal";
DEFINE TABLE Users SCHEMAFULL
    PERMISSIONS
        FOR select, update, delete WHERE id = $auth.id;

DEFINE FIELD email ON TABLE Users TYPE string
    ASSERT string::is::email($value);
DEFINE FIELD password ON TABLE Users TYPE string;
DEFINE FIELD role ON TABLE Users TYPE record<roles> DEFAULT roles:normal;

DEFINE INDEX userEmailIndex ON TABLE Users COLUMNS email UNIQUE;

INSERT INTO Users (email, role, password) VALUES ("test@test.com", roles:admin, crypto::argon2::generate("123456"));
INSERT INTO Profiles (username, user) VALUES ("ExampleUser", (SELECT * FROM Users)[0].id);