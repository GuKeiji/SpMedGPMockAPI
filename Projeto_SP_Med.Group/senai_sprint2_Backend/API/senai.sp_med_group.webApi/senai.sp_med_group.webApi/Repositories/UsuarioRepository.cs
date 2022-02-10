using Microsoft.AspNetCore.Http;
using senai.sp_med_group.webApi.Context;
using senai.sp_med_group.webApi.Domains;
using senai.sp_med_group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace senai.sp_med_group.webApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SpMedContext ctx = new SpMedContext();

        public void Atualizar(int id, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            if (usuarioAtualizado.Nome != null || usuarioAtualizado.Senha != null || usuarioAtualizado.Email != null)
            {
                usuarioBuscado.Nome = usuarioAtualizado.Nome;
                usuarioBuscado.Email = usuarioAtualizado.Email;
                usuarioBuscado.Senha = usuarioAtualizado.Senha;

                ctx.Usuarios.Update(usuarioBuscado);

                ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public string ConsultarPerfilBD(int id_usuario)
        {
            Imagemusuario Imagemusuario = new Imagemusuario();
            Imagemusuario = ctx.Imagemusuarios.FirstOrDefault(i => i.IdUsuario == id_usuario);

            if (Imagemusuario != null)
            {
                return Convert.ToBase64String(Imagemusuario.Binario);
            }
            return null;
        }

        public void Deletar(int id)
        {
            ctx.Usuarios.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Usuario> ListarUsuarios()
        {
            return ctx.Usuarios
                .Select(u => new Usuario
                {
                    Email = u.Email,
                    Nome = u.Nome,
                    IdTipoUsuarioNavigation = new Tipousuario()
                    {
                        Tipo = u.IdTipoUsuarioNavigation.Tipo
                    }
                }).ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }

        public void SalvarPerfilBD(IFormFile foto, int id_usuario)
        {
            Imagemusuario Imagemusuario = new Imagemusuario();
            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);
                Imagemusuario.Binario = ms.ToArray();
                Imagemusuario.NomeArquivo = foto.FileName;
                Imagemusuario.MimeType = foto.FileName.Split('.').Last();
                Imagemusuario.IdUsuario = id_usuario;
            }

            Imagemusuario imagemExistente = new Imagemusuario();
            imagemExistente = ctx.Imagemusuarios.FirstOrDefault(i => i.IdUsuario == id_usuario);

            if (imagemExistente != null)
            {
                imagemExistente.Binario = Imagemusuario.Binario;
                imagemExistente.NomeArquivo = Imagemusuario.NomeArquivo;
                imagemExistente.MimeType = Imagemusuario.MimeType;
                imagemExistente.IdUsuario = id_usuario;

                ctx.Imagemusuarios.Update(imagemExistente);
            }
            else
            {
                ctx.Imagemusuarios.Add(Imagemusuario);
            }

            ctx.SaveChanges();
        }
    }
}
