import { Link } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const { auth, counters } = useAuth();
  const token = localStorage.getItem("token");
  let [formData, setFormData] = useState({ post: "", image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(Global.url + "publication/new-publication", {
        method: "POST",
        headers: {
          "withCredentials": true,
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: formData.post,
          file: formData.image
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }

    setFormData({ post: "", image: null });
    console.log("Form submitted");
  };
  
  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.name} </h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {auth.image !== "default.png" ? (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              ) : (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="general-info__container-names">
              <a href="#" className="container-names__name">
                {auth.name} {auth.last_name}
              </a>
              <p className="container-names__nickname"> {auth.nick} </p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to={"siguiendo/" + auth._id} className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">
                  {counters.following}
                </span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to={"seguidores/" + auth._id} className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">
                  {counters.followed}
                </span>
              </Link>
            </div>

            <div className="stats__following">
              <a href="#" className="following__link">
                <span className="following__title">Publicaciones</span>
                <span className="following__number">
                  {counters.publications}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          <form className="container-form__form-post" onSubmit={handleSubmit}>
            <div className="form-post__inputs">
              <label className="form-post__label">
                ¿Qué quieres compartir hoy?
              </label>
              <textarea
                name="text"
                value={formData.post}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    post: e.target.value,
                  });
                }}
                className="form-post__textarea"
              ></textarea>
            </div>

            <div className="form-post__inputs">
              <label className="form-post__label">Sube tu foto</label>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  });
                }}
                className="form-post__image"
              />
            </div>

            <button type="submit" className="form-post__btn-submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
