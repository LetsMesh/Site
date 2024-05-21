-- ./init-scripts/grant-permissions.sql
-- grant permissions for the user so it can create and access test data
-- without this, the backend process cannot create test data when using DB user `meshadmin`
CREATE USER IF NOT EXISTS 'meshadmin'@'%' IDENTIFIED BY 'meshadminpassword';
GRANT ALL PRIVILEGES ON *.* TO 'meshadmin'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `test_%`.* TO 'meshadmin'@'%';
FLUSH PRIVILEGES;
-- make sure delete any existing test database for mesh
DROP DATABASE IF EXISTS test_mesh;