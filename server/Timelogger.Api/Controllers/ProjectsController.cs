using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}
//test1
		public class ProjectId
{
    public int Id { get; set; } // This will auto-increment if using Entity Framework
    // Other properties
}

		[HttpGet]
		[Route("hello-world")]
		public string HelloWorld()
		{
			return "Hello Back!";
		}

		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Projects);
		}


		[HttpPost]
        public IActionResult CreateProject([FromBody] Project project)
        {
            if (project == null)
            {
                return BadRequest();
            }

            _context.Projects.Add(project);
            _context.SaveChanges();

            return Ok(project);
        }
    }

	}



