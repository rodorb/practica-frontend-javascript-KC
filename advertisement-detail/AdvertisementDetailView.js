export function buildAdvertisementDetailView(advertisement) {
    //Cada anuncio debe mostrar su imagen(si tiene), 
    //nombre, descripción, precio y si es
    //compra o venta.
    //TODO: construir mejor el html y estilos
    return `
    <div>
        <img style="height: 20rem;" src="${advertisement.image}"></img>
        <div> 
            <h2>${advertisement.name}</h2>
            <p>${advertisement.description}</p>
            <p>${advertisement.longDescription}</p>
            <p>${advertisement.price} ${advertisement.priceUnit}</p>
            <p>${advertisement.forSale ? "Venta":"Compra"}</p>
        </div>
    </div>
    `
}