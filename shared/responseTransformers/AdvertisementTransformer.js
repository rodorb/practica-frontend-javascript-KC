export function transformAdvertisement(advertisement) {
    return {
        name: advertisement.name,
        userId: advertisement.userId,
        date: advertisement.updatedAt,
        id: advertisement.id,
        price: advertisement.price,
        priceUnit: advertisement.priceUnit,
        forSale: advertisement.forSale,
        description: advertisement.description,
        image: advertisement.photo ||
            "https://www.logocrea.com/wp-content/uploads/2012/12/twitter.png",
    }
}