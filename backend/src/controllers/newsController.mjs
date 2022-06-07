import { db } from "../models/db.mjs";

// Controladores para NOTICIAS

/**
/* Controlador para buscar una noticia
*/
export function getOneNewsController (request, response){

    const { id_news } = request.params;

    db.get(
        `SELECT id_news, title, date, author, summary, content, src FROM news WHERE id_news=${id_news}`,
        (err, data)=>{
            if (err){
                console.log(`Algo ha funcionado mal...`, err);
                response.status(500).send(`<b>Algo ha funcionado mal...<br>${err}</b>`);
            } else if (!data){
                console.log("No se puede realizar la operación, no existe la noticia.");
                response.status(404).send(`<b>Solicitud denegada. <br>
                                           <br> No se puede realizar la operación porque no existe la noticia.<br>
                                           <br> Introduzca otro id de noticia.</b>`);
                
            }else{
                response.json(data);
                console.log(data);
            }
        });
}

/**
 * Controlador para buscar todas las noticias
 */
export function getAllNewsController (request, response){

    db.all(
        `SELECT id_news, title, date, author, summary, content, src FROM news ORDER BY id_news DESC`,
        (err, data)=>{
            if (err){
                console.log(`Algo ha funcionado mal...`, err);
                response.status(500).send(`<b>Algo ha funcionado mal...<br>${err}</b>`);
            } else {
                response.json(data);
                console.log(data);
            }
        });
}

/**
 * Controlador para publicar una noticia
 */
export function postNewsController (request, response) {
    

    const { title, date, author, summary, content } = request.body;
    
    const src = 'http://localhost:4000/imgs/'+request.file.filename;

        db.run(
        `INSERT INTO news(title, date, author, summary, content, src) VALUES ("${title}", "${date}", "${author}", "${summary}", "${content}", "${src}")`,
            (err)=>{
                if (err) {
                    console.log(`Algo ha funcionado mal...`, err);
                    response.status(500).send(`<b>Algo ha funcionado mal:<br>${err}</b>`);
                        } else {
                            console.log("Noticia añadida a BBDD");
                            response.status(201).send(`<b>Solicitud Aceptada<br>
                                                       <br>La noticia se ha añadido correctamente a la Base de Datos.</b>`);
                        }
            }
        )
}

/**
 * Controlador para modificar una noticia
 */
export function putNewsController(request, response){
    const { id_news, title, date, author, summary, content, src } = request.body;
    db.get(
        `SELECT id_news FROM news WHERE id_news=${id_news}`, 
        (err, data)=>{
            if (err) {
                console.log(err, `Algo ha funcionado mal...`);
                response.status(500).send(`<b>Algo ha funcionado mal. ${err}</b>`);

            } else if (data){

                db.run(
                    `UPDATE news SET title="${title}", date="${date}", author="${author}", summary="${summary}", content="${content}", src="${src}" WHERE id_news=${id_news}`,
                    (err)=>{
                        if (err) {
                            console.log(err, `Algo ha funcionado mal...`);
                            response.status(500).send(`<b>Algo ha funcionado mal. ${err}</b>`);
                        } else {
                            console.log("La noticia se ha actualizado en la BBDD");
                            response.status(201).send(`<b>Solicitud Aceptada<br>
                                                       <br>La noticia se ha actualizado correctamente en la Base de Datos.</b>`);
                        }
                    }
                )
                
            } else {
                console.log(`La noticia no existe...`);
                response.status(500).send(`<b>Solicitud denegada.<br>
                                           <br> No existe la noticia que quiere actualizar...</b>`);
            }
        }
    )
};

/**
 * Controlador para eliminar una noticia
 */
export function deleteNewsController (request,response) {

    //const { id_news } = request.body;

    const { id_news } = request.params;

    db.get(
        `SELECT id_news FROM news WHERE id_news=${id_news}`, 
        (err, data)=>{
            if (err) {
                console.log(err, `Algo ha funcionado mal...`);
                response.status(500).send(`<b>Algo ha funcionado mal. ${err}</b>`);

            } else if (data){

                db.run(
                    `DELETE FROM news WHERE id_news=${id_news}`,
                    (err)=>{
                        if (err) {
                            console.log(err, `Algo ha funcionado mal...`);
                            response.status(500).send(`<b>Algo ha funcionado mal. ${err}</b>`);
                        } else {
                            console.log("La noticia se ha eliminado de la BBDD");
                            response.status(201).send(`<b>Solicitud Aceptada<br>
                                                       <br>La noticia se ha eliminado correctamente de la Base de Datos.</b>`);
                        }
                    }
                )
                
            } else {
                console.log(`La noticia no existe...`);
                response.status(500).send(`<b>Solicitud denegada.<br>
                                           <br> No existe la noticia que quiere eliminar...</b>`);
            }
        }
    )
}
