import { api, uploadCoords } from "../services/api"

function Downloader( { coords }){

    async function makeDownload(){
        var element = document.createElement('a');
        console.log(coords)
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(coords));
        element.setAttribute('href', dataStr);
        element.setAttribute('download', "posicoes.json");
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();

        const cpfPatient = localStorage.getItem('cpf');


        const response = await uploadCoords(dataStr);

      
        document.body.removeChild(element);
    }

    return(
        <h1>
            <button onClick={makeDownload}>Download</button>
        </h1>
    )
}

export default Downloader;