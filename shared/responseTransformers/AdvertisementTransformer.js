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
        longDescription: advertisement.longDescription,
        image: advertisement.photo ||
            "https://www.apconetforum.org/eweb/images/DEMO1/notavailable.jpg",
    }
}