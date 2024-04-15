using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Respositories;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonhocPhanController : ControllerBase
    {
        private readonly IHocPhanRespositories resp;
        public MonhocPhanController(IHocPhanRespositories phanRespositories)
        {
            this.resp = phanRespositories;
        }
        [HttpGet]
        public async Task<ActionResult> all()
        {
            try
            {
                return Ok(await resp.all());
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{ma}")]
        public async Task<ActionResult> getBy([FromRoute] string ma)
        {
            try
            {
                return Ok(await resp.getByKhoa(ma));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("khoa-hocphan/{ma}")]
        public async Task<ActionResult> gettenhocPhanByKhoa([FromRoute] string ma)
        {
            try
            {
                return Ok(await resp.getTenhocPhanByKhoa(ma) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("findma/{name}")]
        public async Task<ActionResult> getMaByName([FromRoute] string name)
        {
            try
            {
                return Ok(await resp.getMaByName(name) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("findByname/{khoa}/{name}")]
        public async Task<ActionResult> getFindByName([FromRoute] string khoa, [FromRoute] string name)
        {
            try
            {
                return Ok(await resp.getfindByName(khoa,name) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Post(Monhockhoa model)
        {
            try
            {
                return Ok(await resp.post(model));
            }
            catch (Exception ex)
            {
                var str = ex.Message;
                if (ex.InnerException != null)
                {
                    str = ex.InnerException.Message;
                }
                return BadRequest(str);
            }
        }
        [HttpPut]
        public async Task<ActionResult> Put(Hocphan model)
        {
            try
            {
                return Ok(await resp.put(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Del([FromRoute] int id)
        {
            try
            {
                return Ok(await resp.del(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
//{
//    "ma": "string",
//  "tenhocphan": "string"
//}