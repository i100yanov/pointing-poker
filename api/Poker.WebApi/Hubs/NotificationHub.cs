using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Poker.WebApi.Hubs
{
    public class NotificationHub : Hub
    {
        public void SendToAll(string name, string message)
        {
            Clients.All.SendAsync("sendToAll", name, message);
        }

        public void ActiveUsers(IList<string> users)
        {
            Clients.All.SendAsync("activeUsers", users);
        }

        public void UserLeft(string name)
        {
            Clients.All.SendAsync("userLeft", name);
        }
    }
}
