using System.ComponentModel.DataAnnotations;

namespace ProjConsulta.ViewModels;

public class RegisterViewModel
{
    [Display(Name = "Nome completo")]
    [Required(ErrorMessage = "Informe seu nome completo.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 100 caracteres.")]
    public string? Name { get; set; }

    [Display(Name = "E-mail")]
    [Required(ErrorMessage = "Informe seu e-mail.")]
    [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
    public string? Email { get; set; }

    [Display(Name = "Senha")]
    [Required(ErrorMessage = "Informe uma senha.")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
    [DataType(DataType.Password)]
    public string? Password { get; set; }

    [Display(Name = "Confirmar senha")]
    [Required(ErrorMessage = "Confirme sua senha.")]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "As senhas não conferem.")]
    public string? ConfirmPassword { get; set; }

    public string? ReturnUrl { get; set; }
}
