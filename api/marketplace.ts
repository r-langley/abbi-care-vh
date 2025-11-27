import {MARKETPLACE_API_URL, marketplaceApiFetch} from './api';
import {Product} from "@/lib/products";

export const getProductById = async (id: string): Promise<any> => {
  const res = await marketplaceApiFetch(`/product/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return await res.json();
};

export const getProductByEan = async (ean: string): Promise<any> => {
    const res = await marketplaceApiFetch(`/products-v2?ean=${ean}`, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch product by EAN');
    }
}

export const getProductsByKey = async (key: string, value: string, brand: string = 'abbi', page = 0): Promise<any[]> => {
  const res = await marketplaceApiFetch(`/products-v2?${key}=${value}&brand=${brand || 'abbi'}&page=${page}&max=50`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return await res.json();
};

export const getAllProducts = async (
    emuage = false,
    packs = false,
    coffrets = false,
    event = false,
    ticket = false,
    onChunk?: (products: any[]) => void // optional callback per resolved promise
): Promise<any[]> => {
    const allPromise: Promise<any[]>[] = [];

    allPromise.push(getProductsByKey('range', 'SUR_MESURE'));
    allPromise.push(getProductsByKey('range', 'BASE'));
    allPromise.push(getProductsByKey('range', 'BOOSTER'));
    allPromise.push(getProductsByKey('range', 'PRODUIT_OFFERT'));
    allPromise.push(getProductsByKey('range', 'MOUSSE'));
    allPromise.push(getProductsByKey('range', 'PRET_VENTE'));

    if (emuage) {
        allPromise.push(getProductsByKey('category1', '', 'Emuage', 0));
    }
    if (packs) {
        // allPromise.push(getProductsByKey('ean', '44505425641672'));
        allPromise.push(getProductsByKey('ean', '44505425936584'));
        allPromise.push(getProductsByKey('ean', '4040404040'));
        allPromise.push(getProductsByKey('range', 'JULY_Bundles'));
    }
    if (coffrets) {
        allPromise.push(getProductsByKey('range', 'coffrets'));
    }
    if (event) {
        allPromise.push(getProductsByKey('range', 'Christmas2025'));
    }
    if (ticket) {
        allPromise.push(getProductsByKey('ean', '260200011'));
    }

// attach per-promise handler: called as soon as each finishes
    const tappedPromises = allPromise.map(p =>
        p.then(result => {
            if (onChunk) {
                onChunk(result); // "one by one" callback
            }
            return result;
        })
    );

    // wait until everything is done, but you already got chunks earlier
    const allResults = await Promise.all(tappedPromises);
    return allResults.flat();
}

export const getImage = (product: Product) => {
    if (product.image2) {
        return MARKETPLACE_API_URL + '/images/' + product.image2;
    } else if (product.image) {
        return MARKETPLACE_API_URL + '/images/' + product.image;
    }
    if(product.brand === 'Emuage')
        return '/emuage.png';

    return '/minimalist-cosmetic-pump-bottle-product-photograph.jpg';
}