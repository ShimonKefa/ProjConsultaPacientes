using System.ComponentModel.DataAnnotations;

namespace ProjConsulta.ViewModels;

public class LoginViewModel
{
    [Display(Name = "E-mail")]
    [Required(ErrorMessage = "Informe seu e-mail.")]
    [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
    public string? Email { get; set; }

    [Display(Name = "Senha")]
    [Required(ErrorMessage = "Informe sua senha.")]
    [DataType(DataType.Password)]
    public string? Password { get; set; }

    [Display(Name = "Lembrar de mim")]
    public bool RememberMe { get; set; }

    public string? ReturnUrl { get; set; }
}
