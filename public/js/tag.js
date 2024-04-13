import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'

async function searchPosts() {
    try {
        var searchInput = document.getElementById("searchInput").value;
        if(!searchInput) {
            openModal("Enter some tag", closable=true);
            return;
        }
        openModal("Loading...")
        const response = await fetch("/api/posts/tag/" + searchInput)
        const data = await response.json();
        console.log(data)
        if(!data.success){
            throw new Error(data.error);
        }
        displayPosts(data.data);
        
        closeModal();
    } catch (error) {
        openModal(error.message, true);
        console.error("Error fetching posts:", error)
    }
}



function displayPosts(posts) {
    var postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = ""; // Clear previous posts

    posts.forEach((post, idx) => {
        var postLink = document.createElement("a");
        postLink.classList.add("post-link");
        postLink.href = `/demo/post/${post.id}`
        postLink.target = "_blank"

        const postCard = `
        <div class="post-card">
            <img src="${post.imgUrl}" alt="${post.alt}" id="img-${idx}">
            <div class="post-info">
                <h2>@${post.author}</h2>
                <p>${post.alt.substring(0, 60)}...</p>
                <span class="timestamp">${moment(post.time).fromNow()}</span>
            </div>
        </div>
        `
        postLink.innerHTML = postCard;

        postsContainer.appendChild(postLink);
        new cDg(`img-${idx}`).view();
    });
}


document.getElementById("search-btn").addEventListener("click" ,() => {
    searchPosts();
})
// searchPosts();

displayPosts([
    {
        "id": "C5qJiGzq5NJ",
        "imgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t39.30808-6/435921687_18424725130013186_1431239359530261689_n.jpg?stp=c0.165.1344.1344a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=564mby66Ua0Ab7bVKEE&edm=AOUPxh0AAAAA&ccb=7-5&oh=00_AfAbnAhEzKaCiVzIGSXzJ7sTArtBiqJSXMIsVRRO5vh-7Q&oe=661F6EA8&_nc_sid=9dc660",
        "alt": "Photo by Emirhan Perker on April 12, 2024. May be an illustration of text.",
        "caption": "LOADING☕️\n\n#canımkendim #illustration #doodle #doodleart #illustrator #sketch #cartoon #farkındalık #motivasyon #coffeetime #kahve",
        "time": "2024-04-12T10:46:20.000Z",
        "postImgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t39.30808-6/435921687_18424725130013186_1431239359530261689_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=564mby66Ua0Ab7bVKEE&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfDoyfzysuQ97LVWrXa0d5TDNLpW5enxxnadyVEO16XMXA&oe=661F6EA8&_nc_sid=cf751b",
        "author": "emirhanperker"
    },
    {
        "id": "C5iyfwvKElP",
        "imgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/436036364_3509393905980211_5791664446068976456_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=sX79COgdpbMAb4Lt3WB&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfDFbEvOzMxerNxAoIbbAitRwq5b5nYBHmoOCavKyOLy4g&oe=661F60BC&_nc_sid=9dc660",
        "alt": "Photo by Avril on April 09, 2024. May be pop art of people kissing, fire, heart and poster.",
        "caption": "🩸🩸🩸\n\n#art #horrorart #characterdesign #character #werewolf #horror #horrormovies #bodyhorror #bodyhorrorart #horrorartist #comic #comicart #comicbook #cartoon #cartoonist",
        "time": "2024-04-09T14:10:21.000Z",
        "postImgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/436036364_3509393905980211_5791664446068976456_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=sX79COgdpbMAb4Lt3WB&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfA7-24ODcehXhbleu_PMZdtwdgKFr1hvk2JSyWB1eVXzw&oe=661F60BC&_nc_sid=cf751b",
        "author": "avril.en"
    },
    {
        "id": "C5obnyYu2jp",
        "imgUrl": "https://instagram.fpnq2-2.fna.fbcdn.net/v/t39.30808-6/435098951_18236875636266201_2116279166179896431_n.jpg?stp=dst-jpg_e15_fr_p1080x1080&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=HkfNaF8WvAcAb7xoeMG&edm=AOUPxh0AAAAA&ccb=7-5&oh=00_AfBlUlwFKfHUlLkvuoVhSWxXk76Wi6XPeqPYPi6gCyB1bg&oe=661F4CFE&_nc_sid=9dc660",
        "alt": "Photo by Gonzalo Miño on April 11, 2024. May be an image of seal, bear, arctic and text.",
        "caption": "Relax! 🐻‍❄️❄️\n\nQue todo fluya y nada influya🏊‍♂️ 📽️ @florian_ledoux_photographer\n\n#oso #animalesfelices #osopolar #animalesgraciosos #glaciar #animalesfantásticos #dibujos #cartoon #gonzalomiño",
        "time": "2024-04-11T18:45:55.000Z",
        "postImgUrl": "https://instagram.fpnq2-2.fna.fbcdn.net/v/t39.30808-6/435098951_18236875636266201_2116279166179896431_n.jpg?stp=dst-jpg_e15_fr_p1080x1080&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=HkfNaF8WvAcAb7xoeMG&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfBHlAqsm9P08-3MySSlF96gXUyIKeROwRnATTiAAVgelw&oe=661F4CFE&_nc_sid=cf751b",
        "author": "gonzalo_m02"
    },
    {
        "id": "C5gVXs_RQHC",
        "imgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/435056168_433624925694214_3923932654058050203_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=nsiLgGrdy64Ab7V8mc7&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfB5FnBVa6SLiWzv3Rqx9hFosdae4ch3-Hx1RFk9tT35Qw&oe=661F55D4&_nc_sid=9dc660",
        "alt": "Photo by Brooke Bourgeois on April 08, 2024. May be pop art of poster.",
        "caption": "Careful with eclipse out there today folks! 👓 ☀️ 🌙\nThanks @polhemuscott for the caption help 🐍\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n#medusa #greekmythology #perseus #greekmyth #eclipse #solareclipse #glasses #sun #tnycartoons #cartoon #comic #illustration",
        "time": "2024-04-08T15:17:22.000Z",
        "postImgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/435056168_433624925694214_3923932654058050203_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=nsiLgGrdy64Ab7V8mc7&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfDUjHUBk2-4zGDQhhvFsfr2jdgOUuB1MUbwg3GrpsMz9w&oe=661F55D4&_nc_sid=cf751b",
        "author": "b_a_bourgeois"
    },
    {
        "id": "C5ipdrWReO7",
        "imgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/436545895_793526496005590_6469750662377467666_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=itIASs2KQl4Ab4z9b_W&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfCxfYk-EOaMUE2MqIPd0x-xI6Ws9Q22TtOrpAJ9ssE_yA&oe=661F6EEE&_nc_sid=9dc660",
        "alt": "Photo by Bryan Velayo on April 09, 2024. May be pop art.",
        "caption": "bunch of hairdos\n\n#characterdesign #characterart #artist #artistsoninstagram #cartoon #illustration #darkharvest",
        "time": "2024-04-09T12:51:26.000Z",
        "postImgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/436545895_793526496005590_6469750662377467666_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=itIASs2KQl4Ab4z9b_W&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfAEUJ00Nv4e9FJyZ12ogWSGHM8m1RueMT0JNfLju9hKtQ&oe=661F6EEE&_nc_sid=cf751b",
        "author": "roastedstix"
    },
    {
        "id": "C5qlasnvSpN",
        "imgUrl": "https://instagram.fpnq2-2.fna.fbcdn.net/v/t51.29350-15/437974845_1817364152024701_1660797637036643983_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Yk4EofNnhzgAb4leeCv&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfCWtMdBII1cLJ8nJn4gSt1ZnPY5FGuj2A-IyiCva2Kfaw&oe=661F5912&_nc_sid=9dc660",
        "alt": "Photo by Chiwoo on April 12, 2024. May be an image of gingerbread cookie and text that says 'ចកด INTO To THE WILD South Purrk GOOUT AND HAVE SOME FUN 0 LOOK up IN THE sKy 4 @CHIWOOMON'.",
        "caption": "New Flash Available ⛺️🌲\n🇰🇷Seoul Booking - Link in Bio\n🔗chiwoomon.com\n\n#tattoo #handpoke #handpoked #handpoketattoo #seoultattoo #koreatattoo #cartoontattoo #cartoon #animetattoo #illustration #cat #cattattoo #kittytattoo #outdoor #camplife #garfield #southpark #yeti #sasquatch",
        "time": "2024-04-12T14:26:43.000Z",
        "postImgUrl": "https://instagram.fpnq2-2.fna.fbcdn.net/v/t51.29350-15/437974845_1817364152024701_1660797637036643983_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Yk4EofNnhzgAb4leeCv&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfC0DeiTMqpLWVavb4Zfox3xbWdt4u1waqf0_uI2h16NPA&oe=661F5912&_nc_sid=cf751b",
        "author": "chiwoomon"
    },
    {
        "id": "C5h8LGnsVKc",
        "imgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/436668482_342723994978162_242496840631269477_n.jpg?stp=c151.0.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=CIcfsqbvnhcAb7qc7kl&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfA2EUZCM5GbHedl7otCXqGmQQ6xd5YU_Go7M7yWldzlqA&oe=661F51F1&_nc_sid=9dc660",
        "alt": "Photo by Bettina Schipping Cartoons on April 08, 2024. May be an illustration of text.",
        "caption": "Spaßorientierte Zugvögel. #zugvögel #bordbistroparty #birdbistro #zugvögelkommenzurück #zugvögelkennenkeinegrenzen #bierchen #speisewagen #spassunterwegs #cartoon #witze #bettinaschippingcartoons",
        "time": "2024-04-09T06:15:41.000Z",
        "postImgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t51.29350-15/436668482_342723994978162_242496840631269477_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=CIcfsqbvnhcAb7qc7kl&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfDfJxTZRu_aHo1Z8APJtjHn-mH-A0lgJQVRU-sZzTP5Lw&oe=661F51F1&_nc_sid=cf751b",
        "author": "bettinaschipping"
    },
    {
        "id": "C5orS7KScL3",
        "imgUrl": "https://instagram.fpnq2-2.fna.fbcdn.net/v/t51.29350-15/437772997_1385184425496339_2738320109627330358_n.webp?stp=c0.101.806.806a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=MC2T-UEQsMsAb6foYp0&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfDDHEO2YWwL5JmdveuBAQRDAdF-q53dBGCi9Z1SmbJ-TA&oe=661F47EE&_nc_sid=9dc660",
        "alt": "Photo by Comic Loser on April 11, 2024. May be an image of poster and text.",
        "caption": "I think their names might be Turok\n\nComic: Turok issue 4 (2019)\n\n#comics #art #marvel #comicbooks #comic #dccomics #marvelcomics #drawing #illustration #dc #comicart #batman #spiderman #comicbook #artist #manga #anime #sketch #cartoon #igcomicfamily #cosplay #digitalart #avengers #artwork #mcu #draw #igcomics #comicstrip #superman #comiccollector",
        "time": "2024-04-11T21:02:53.000Z",
        "postImgUrl": "https://instagram.fpnq2-2.fna.fbcdn.net/v/t51.29350-15/437772997_1385184425496339_2738320109627330358_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=MC2T-UEQsMsAb6foYp0&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfBtmkLGSqQsUl210C1DU9w6Pi8dUxH6ss82zk8hbGQj9Q&oe=661F47EE&_nc_sid=cf751b",
        "author": "comics_out.of_context"
    },
    {
        "id": "C5nPj4jMR9W",
        "imgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t39.30808-6/436772123_18428855638047454_4642017202202983405_n.jpg?stp=c181.0.1077.1077a_dst-jpg_e15_s640x640&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=7m68l3uqo-cAb5hoiN0&edm=AOUPxh0AAAAA&ccb=7-5&oh=00_AfCx3I6Ui76jyP7tKUxV0cGHScrZ_7V_5r3YWcKZTdcIzA&oe=661F3C86&_nc_sid=9dc660",
        "alt": "Photo by Lo Graf von Blickensdorf on April 11, 2024. May be a cartoon of text that says 'Wie kommst du immer ZUY Arbeit? Ich pendel. 2 Esoterikerinnen'.",
        "caption": "Aus meinem Skizzenblock...\n\n#Esoterik #spirituell #pendeln #nahverkehr #Homöopathie #cartoon #arbeitsweg #heilen #wahrsagen\n#followmeplease",
        "time": "2024-04-11T07:41:17.000Z",
        "postImgUrl": "https://instagram.fpnq2-1.fna.fbcdn.net/v/t39.30808-6/436772123_18428855638047454_4642017202202983405_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=7m68l3uqo-cAb5hoiN0&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfBucVTDLTn0s4X1edM3hrC1G-5q1JeGKOzmqPxPlMFYcA&oe=661F3C86&_nc_sid=cf751b",
        "author": "tortengraf"
    }
])