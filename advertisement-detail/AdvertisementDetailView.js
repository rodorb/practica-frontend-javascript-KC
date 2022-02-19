export function buildAdvertisementDetailView(advertisement) {
    //Cada anuncio debe mostrar su imagen(si tiene), 
    //nombre, descripción, precio y si es
    //compra o venta.
    //TODO: construir mejor el html y estilos
    return `
    <div>
        <img style="height: 20rem;" src="${advertisement.image}"></img>
        <div> 
            <h1>${advertisement.name}</h1>
            <p><strong>Descripción general:</strong> ${advertisement.description}</p>
            <p><strong>Detalle del producto:</strong> ${advertisement.longDescription}</p>
            <p><strong>Precio:</strong> ${advertisement.price} ${advertisement.priceUnit}</p>
            <p>${advertisement.forSale ? "<strong>En Venta</strong>":"<strong>Se Compra</strong>"}</p>
        </div>
    </div>
    `
}