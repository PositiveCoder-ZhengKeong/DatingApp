using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T: class;   // T could be either "User" or "Photo"
        void Detele<T>(T entity) where T: class;
        Task<bool> SaveAll();                   // Save all changes "OR" Save unsaved changes
        Task<IEnumerable<User>> GetUsers();     // Get Multiple Users
        Task<User> GetUser(int id);                   // Get Single User
        Task<Photo> GetPhoto(int id);           // Get photo
        Task<Photo> GetMainPhotoForUser(int userId);             // Get the current main photo
    }
}