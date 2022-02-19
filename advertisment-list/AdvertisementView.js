export function buildAdvertisementView(advertisement) {
    const advertisementThumbnailView = buildAdvertisementThumbnailView(advertisement);
    return `
        <a href="/advertisementDetail.html?id=${advertisement.id}">
            ${advertisementThumbnailView}
        </a>
    `
}

function buildAdvertisementThumbnailView(advertisement) {
    //Cada anuncio debe mostrar su imagen(si tiene), 
    //nombre, descripción, precio y si es
    //compra o venta.
    //TODO: construir mejor el html y estilos
    return `
    <div class="advertisement-item">
        <img src="${advertisement.image}"></img>
        <div class="advertisement-item-text "> 
            <h2>${advertisement.name}</h2>
            <p>${advertisement.description}</p>
            <p>${advertisement.price} ${advertisement.priceUnit}</p>
            <p>${advertisement.forSale ? "Venta":"Compra"}</p>
        </div>
    </div>
    `
}