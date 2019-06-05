namespace Poker.Service.Interfaces
{
    public interface IAuthenticationService
    {
        string Authenticate(string username, string password, string secret);
    }
}