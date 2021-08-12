<template>
    <div>
        <h1 style="">algo errado aconteceu <a href="/#logout"> clique aqui </a> para recarregar</h1>
    </div>
</template>
<script>
    const token = JSON.parse(localStorage.getItem("user-token"));
    console.log("token");
    console.log(token);
     var urlBase = "https://hapi-farmafacil.prismafive.com.br/";
     if (process.env.NODE_ENV === "development") {
          urlBase = "https://localhost:5001/";
      }
  

    /*  let json = {
        usuarioId: "a227b9e6-a9b2-4c71-a279-c5ff6e20335a",
        nome: "teste",
        email: "teste@teste.com" ,
        }; */
          let usuarioId = "a227b9e6-a9b2-4c71-a279-c5ff6e20335a";
        const props = {
            method: "post",
            body: JSON.stringify(usuarioId),
            headers: {
                "content-type": "application/json"
            }
        };
        let url = urlBase + "login/logout"
       fetch(url, props)
       .then(function (response){
        console.log(response.status)
        if (response.status == 200){
            localStorage.clear();
            document.location.href = ("/");

        }
        else{
        console.log(response.status)

        }
       });

   
</script>