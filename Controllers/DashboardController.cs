using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ProjConsulta.Controllers;

public class DashboardController : Controller
{
    [Authorize]
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }
}
