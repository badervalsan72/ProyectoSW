async function crearAerolinea() {

}

async function getAerolineas() {

}


function cargarImagen() {
    let inputFile = document.getElementById("inputFile");
    let btnCargar = document.getElementById("btnCargar");
    let imageSpace = document.getElementById("custom-space");

    btnCargar.addEventListener("click", function() {
        inputFile.click();
    });

    inputFile.addEventListener("change", function() {
        //  Format Selected File Text
        if (inputFile.value) {
            imageSpace.innerHTML = inputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            localStorage.setItem("imagen", inputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);

        } else {
            localStorage.setItem("imagen", "default.jpg"); // DEBE SER NULL 
            imageSpace.innerHTML = "No File, Selected!";
        }

        // Image Preview
        const files = inputFile.files[0]; //files[0] - For getting first file TIENE LA IMAGEN
        //   console.log(files);

        console.log("tipo de files en la imagen: " + typeof(files));

        if (files) {
            // Showing Image and Hiding "Image Preview" Text
            document.getElementById("preview_img").style.display = "block";
            document.getElementById("preview_text").style.display = "none";
            //Read File
            const fileReader = new FileReader();

            fileReader.addEventListener("load", function() {
                // convert image to base64 encoded string
                document.getElementById("preview_img").setAttribute("src", this.result);
                console.log("resultado = " + this.result);
            });
            fileReader.readAsDataURL(files);
        }
    });
}