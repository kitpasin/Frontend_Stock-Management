const appConfigDEV = {
    isDevMode: true,
    language: "fr",
    timeZone: "Europe/Paris",
    languageAvailable: ["fr","en"],  
    apiPath:"http://localhost:8000/api/backoffice/v1/",
    uploadPath:"http://localhost:8000/",
    webPath:"http://localhost:8000/",
    pages: {
        dashboard: true,
        messages: false,
        inbox: false,
        subscribe: false,
        productcate: true,
        products: true,
        members: false,
        slides: true,
        menu: false,
        category: true,
        posts: true,
        reports: false,
        webinfo: false,
        languages: false,
        admins: true,
        configs: false,
        profile: false,
        suppliers: true,
        amount: true,
        vat: true,
        groups: {
            notify: true,
            article: true,
            product: true,
            report: false,
            system: true,
        }
    },
    features: {
        multilingual: true,
        flexibleCategory: true,
        multipleImage: true,
        seo: true,
        price: false,
        tag: true,
        iframe: true,
        redirect: true,
        social: false,
        notify: false,
    }
}
const appConfigPROD = {
    isDevMode: false,
    language: "fr",
    timeZone: "Europe/Paris",
    languageAvailable: ["fr","en"],  
    apiPath:"https://thaigeneralconcrete.co.th/api/backoffice/v1/",
    uploadPath:"https://thaigeneralconcrete.co.th/",
    webPath:"https://thaigeneralconcrete.co.th/",
    pages: {
        dashboard: true,
        messages: false,
        inbox: false,
        subscribe: false,
        productcate: false,
        products: false,
        members: false,
        slides: true,
        menu: false,
        category: true,
        posts: true,
        reports: false,
        webinfo: true,
        languages: true,
        admins: true,
        configs: true,
        profile: true,
        groups: {
            notify: true,
            article: true,
            product: false,
            report: false,
            system: true,
        }
    },
    features: {
        multilingual: true,
        flexibleCategory: true,
        multipleImage: true,
        seo: true,
        price: false,
        tag: true,
        iframe: true,
        redirect: true,
        social: false,
        notify: false,
    }
}

export default appConfigDEV;
// export default appConfigPROD;



