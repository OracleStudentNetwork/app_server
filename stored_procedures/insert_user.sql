drop procedure if exists insert_user;
create procedure insert_user(in p_displayName varchar(255))
begin
    insert into users (displayName) values (p_displayName);
    select * from users where id = last_insert_id();
end