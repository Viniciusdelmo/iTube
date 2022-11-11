import React from "react";
import { StyledRegisterVideo } from "./styles";
import {createClient} from "@supabase/supabase-js";

function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
                console.log(evento.target);
                const value = evento.target.value;
                const name = evento.target.name
                console.log(evento.target.name);
                setValues({
                  ...values,
                  [name]: value,
                });
              },
              clearForm(){
                setValues({
                    titulo: '',
                    url: '',
                  });
              }
        }
    };

const PROJECT_URL = "https://znktxcagdddakxrlkesc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpua3R4Y2FnZGRkYWt4cmxrZXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjYzNTIsImV4cCI6MTk4Mzc0MjM1Mn0.FI0SDGDJLx2A5mYvAdCH-v5j-KFoo-Vhi1mqm3D2lrg"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo: "Frostpunk - Neve e Steak tartare", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
});
  const [formVisivel, setFormVisivel] = React.useState(false);

  console.log(supabase.from("video").insert());

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form onSubmit={(evento)=>{
            evento.preventDefault();
            console.log(formCadastro.values);

            supabase.from("video").insert({
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos",
            })
            .then((oqueveio) => {
              console.log(oqueveio);
            })
            .catch(()=>{
              console.log(err);
            })

            setFormVisivel(false);
            formCadastro.clearForm();
        }}>
          <div>
            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input 
            placeholder="URL" 
            name="url"
            value={formCadastro.values.url} 
            onChange={formCadastro.handleChange}/>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : 
      
        false}
    </StyledRegisterVideo>
  )
}
