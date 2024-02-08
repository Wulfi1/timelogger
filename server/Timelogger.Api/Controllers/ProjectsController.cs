using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Timelogger.Entities;
using System.Linq;
using System.Collections.Generic;

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

		public class ProjectId
		{
			public int Id { get; set; }
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

		[HttpPost]
		[Route("registerTime")]
		public IActionResult RegisterTime([FromBody] TimeRegistrationRequest request)
		{
			var project = _context.Projects.FirstOrDefault(p => p.Id == request.Id);
			if (project == null)
			{
				return NotFound(new { message = "Project not found." });
			}

			project.RegisteredTime += request.Time;

			var timeRegistration = new TimeRegistrations
			{
				ProjectId = request.Id, // Assuming you have a foreign key to Project
				RegisteredTime = request.Time,
				Note = request.Note,
				Date = request.Date,
			};

			_context.TimeRegistrations.Add(timeRegistration);
			_context.SaveChanges();

			return Ok(new { message = "Time registered successfully." });
		}

		public class TimeRegistrationRequest
		{
			public int Id { get; set; }
			public int Time { get; set; }
			public string Note { get; set; }
			public string Date { get; set; }
		}

		[HttpGet("{projectId}/timeregistrations")]
		public ActionResult<IEnumerable<TimeRegistrations>> GetTimeRegistrationsForProject(int projectId)
		{
			var timeRegistrations = _context.TimeRegistrations
				.Where(tr => tr.ProjectId == projectId)
				.Select(tr => new TimeRegistrations
				{
					RegisteredTime = tr.RegisteredTime,
					Note = tr.Note,
					Date = tr.Date
				})
				.ToList();

			return Ok(timeRegistrations);
		}

		[HttpGet]
		[Route("timeRegistrations")]
		public IActionResult GetTimeRegistrations()
		{
			var timeRegistrations = _context.TimeRegistrations.ToList();
			return Ok(timeRegistrations);
		}


	}

}



