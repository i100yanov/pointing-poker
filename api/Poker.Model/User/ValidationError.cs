namespace Poker.Model.User
{
    public enum ValidationError
    {
        UsernameMissing = 1,
        UsernameExists,
        UsernameToLong,
        PasswordMissing,
        PasswordToLong,
        FirstnameMissing,
        FirstnameToLong,
        LastnameMissing,
        LastnameToLong,
        EmailMissing,
        EmailToLong,
        EmailWrongFormat
    }
}