const Listing = require('../models/listingModel');


/**
 * 
 * @param {*} data 
 * @returns 
 */
const addListing = async function(data) {
    let listing = new Listing(data);
    await listing.save(listing);   
    return listing;
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const getListingById = async function(id) {
    const listing = await Listing.findOne({_id: id});
    return listing;
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const getListingByHostId = async function(id) {
    const listing = await Listing.findOne({hostId: id});
    return listing;
}

/**
 * 
 * @param {*} listing 
 * @returns 
 */
const updateListing = async function(listing) {
    await listing.save(listing);
    return listing;
}

/**
 * 
 * @returns 
 */
const getAllListings = async function() {
    const listings = Listing.find({}); 
    return listings;
}

/**
 * 
 * @param {*} longitude 
 * @param {*} latitude 
 * @param {*} maxDist 
 * @returns 
 */
const getListingsNearCoordinates = async function(longitude, latitude, maxDist) {
    
    const listings = Listing.find(
        {
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [longitude, latitude]},
                    $minDistance: 0,
                    $maxDistance: maxDist
                }
            }
        }
    )
    return listings;
}

module.exports = {
    addListing,
    getListingById,
    getListingByHostId,
    updateListing,
    getAllListings,
    getListingsNearCoordinates
}