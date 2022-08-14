insert into users (
    "username",
    "firstName",
    "lastName",
    "email",
    "avatar"
) values ($1, $2, $3, $4, $5) returning id;