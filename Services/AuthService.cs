using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjConsulta.Data;
using ProjConsulta.Entities;

namespace ProjConsulta.Services;

public class AuthService
{
    private readonly DBCOM _context;
    private readonly IPasswordHasher<AppUser> _passwordHasher;

    public AuthService(DBCOM context, IPasswordHasher<AppUser> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<AppUser?> ValidateCredentialsAsync(string email, string password)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var user = await _context.users.SingleOrDefaultAsync(user => user.Email == normalizedEmail);

        if (user is null || !user.IsActive)
        {
            return null;
        }

        var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (verificationResult == PasswordVerificationResult.Failed)
        {
            return null;
        }

        if (verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, password);
            await _context.SaveChangesAsync();
        }

        return user;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        return await _context.users.AnyAsync(user => user.Email == normalizedEmail);
    }

    public async Task<(bool Success, string? ErrorMessage, AppUser? User)> RegisterUserAsync(string name, string email, string password, string role = "User")
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var exists = await _context.users.AnyAsync(user => user.Email == normalizedEmail);
        if (exists)
        {
            return (false, "Já existe uma conta vinculada a este e-mail.", null);
        }

        var user = new AppUser
        {
            ID = Guid.NewGuid(),
            Name = name.Trim(),
            Email = normalizedEmail,
            Role = role,
            IsActive = true
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, password);
        _context.users.Add(user);
        await _context.SaveChangesAsync();

        return (true, null, user);
    }
}
