﻿using System.Collections.Generic;
using Poker.Domain.Entities.Interfaces;

namespace Poker.Domain.Factories.Interfaces
{
    public interface IUserFactory
    {
        IUser Get(int id);

        IUser Get(string username);

        IUser Get(Transportation.Entities.User user);

        IList<IUser> GetAll();

        IUser New(string username, string password);
        void AddToActiveList(string username);
        bool RemoveFromActiveList(string username);
       IList<IUser> GetAllActive();
    }
}