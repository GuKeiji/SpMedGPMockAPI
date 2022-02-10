using senai.sp_med_group.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.sp_med_group.webApi.Interfaces
{
    interface IConsultaRepository
    {
        void CadastrarConsulta(Consultum novaConsulta);
        void AlterarDescricao(string descricao, int id);
        void RemoverConsulta(int id);
        void CancelarConsulta(int Id);
        Consultum BuscarPorId(int id);
        List<Consultum> ListarMinhasConsultas(int id, int idTipoUsuario);
        List<Consultum> ListarTodas();
    }
}
