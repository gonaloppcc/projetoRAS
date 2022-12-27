using Microsoft.EntityFrameworkCore;
using RasbetServer.Exceptions.Users;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.UserRepository;

namespace RasbetServer.Services.Users;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<User> LoginAsync(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user.Password != password)
        {
            throw new IncorrectCredentialsException("Incorrect password");
        }

        return user;
    }

    public async Task<User> RegisterAsync(User user)
    {
        try
        {
            await _userRepository.AddUserAsync(user);
            return await _userRepository.GetUserByEmailAsync(user.Email);
        }
        catch (DbUpdateException e)
        {
            throw new UserAlreadyExistsException("A user with this email already exists", e);
        }
    }

    public async Task DeleteUserAsync(string id)
    {
        var user = await _userRepository.GetUserAsync(id);
        await _userRepository.DeleteUserAsync(user);
    }

    public async Task ChangePasswordAsync(string id, string newPassword)
    {
        var user = await _userRepository.GetUserAsync(id);
        user.Password = newPassword;
        await _userRepository.UpdateUserAsync(user);
    }

    public async Task<float> UpdateBalanceAsync(string id, float amount)
    {
        var user = await _userRepository.GetUserAsync(id);

        if (user is not Better better)
            throw new InvalidUserTypeException("User is not a better");
        
        better.Balance += amount;
        if (better.Balance < 0)
            throw new InvalidOperationException("Not enough balance");
        
        await _userRepository.UpdateUserAsync(better);
        return better.Balance;
    }

    public async Task<IEnumerable<Transaction>> GetTransactionHist(string id)
    {
        var user = await _userRepository.GetUserAsync(id);
        if (user is not Better better)
            throw new InvalidUserTypeException("User is not a better");

        return better.TransactionHist;
    }
}