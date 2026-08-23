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
}
