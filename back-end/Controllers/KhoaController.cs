using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Responsitories;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoaController : ControllerBase
    {
        private readonly IKhoaRespositories _khoaPepo;

        public KhoaController(IKhoaRespositories repo)
        {
            _khoaPepo = repo;
        }

        [HttpGet]
   
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _khoaPepo.getAll());
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(Khoa model)
        {
            try
            {
                return Ok(await _khoaPepo.post(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Fix(Khoa model)
        {
            try
            {
                return Ok(await _khoaPepo.put(model) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{ma}")]
        public async Task<IActionResult> Del(string ma)
        {
            try
            {
                return Ok(await _khoaPepo.del(ma) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("delete-file")]
        public async Task<IActionResult> DelFile([FromBody]List<Khoa> list)
        {
            try
            {
                return Ok(await _khoaPepo.delfile(list));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("delete-dk-lop")]
        public async Task<IActionResult> DelDkLop([FromBody] List<Khoa> list)
        {
            try
            {
                return Ok(await _khoaPepo.dellop(list));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
//{
//    "ma": "HHH",
//  "ten": "hhhhh"
//}