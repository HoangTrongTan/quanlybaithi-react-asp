using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;
using Webquanlybaithi.Respositories;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFilesRespositories _resp;
        public FilesController(IFilesRespositories resp)
        {
            _resp = resp;
        }
        [HttpGet("{ma}")]
        public async Task<ActionResult> GetFiles(string ma)
        {
            try
            {
                return Ok(await _resp.get(ma) );
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<ActionResult> All()
        {
            try
            {
                return Ok(await _resp.all() );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getDependsFiles")]
        public async Task<ActionResult> DependsFilesAll()
        {
            try
            {
                return Ok(await _resp.getDependsFiles() );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 1024 * 1024 * 1024)]
        public async Task<ActionResult> Post([FromForm] FilesUpModel model) 
        {
            try
            {
                return Ok(await _resp.post(model) );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Del(int id)
        {
            try
            {
                return Ok( await _resp.delete(id) );
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<ActionResult> FixFiles([FromForm]FilesUpModel model)
        {
            try
            {
                return Ok( await _resp.Fix(model) );
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ckfiles/")]
        public async Task<ActionResult<FilesUpModelsEnough> > CheckFiles([FromBody] List<FilesUpModelsEnough> model )
        {
            try
            {
                return Ok(await _resp.CheckFiles(model) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
