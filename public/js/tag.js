import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'

async function searchPosts() {
    try {
        var searchInput = document.getElementById("searchInput").value;
        if(!searchInput) {
            openModal("Enter some tag", closable=true);
            return;
        }
        searchInput = searchInput.split(" ").join("");
        openModal("Loading...")
        const response = await fetch(`/api/posts/tag/${searchInput}`)
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
        // new cDg(`img-${idx}`).view();
    });
}

document.getElementById("search-btn").addEventListener("click" ,() => {
    searchPosts();
})
// searchPosts();

displayPosts([
    {
        "id": "C5qJiGzq5NJ",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t39.30808-6/435921687_18424725130013186_1431239359530261689_n.jpg?stp=c0.165.1344.1344a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=564mby66Ua0Ab7bVKEE&edm=AOUPxh0AAAAA&ccb=7-5&oh=00_AfCti9eI9gYhAlNvUb3Spp0pG-3FbFfrgTo3UEW_VbM2Eg&oe=66201768&_nc_sid=9dc660",
        "alt": "Photo by Emirhan Perker on April 12, 2024. May be an illustration of text.",
        "caption": "LOADING☕️\n\n#canımkendim #illustration #doodle #doodleart #illustrator #sketch #cartoon #farkındalık #motivasyon #coffeetime #kahve",
        "time": "2024-04-12T10:46:20.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t39.30808-6/435921687_18424725130013186_1431239359530261689_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=564mby66Ua0Ab7bVKEE&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfABHXGRpG-ofWYEHbU7LPaTuKpT6z8j0IA1PMR6FyYvbw&oe=66201768&_nc_sid=cf751b",
        "author": "emirhanperker"
    },
    {
        "id": "C5iyfwvKElP",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/436036364_3509393905980211_5791664446068976456_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=sX79COgdpbMAb4Lt3WB&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfAZ8zFau_fQs1Vz5RlvnfP_euQu7qERdbT7sWdHUdNgRw&oe=662041BC&_nc_sid=9dc660",
        "alt": "Photo by Avril on April 09, 2024. May be pop art of people kissing, fire, heart and poster.",
        "caption": "🩸🩸🩸\n\n#art #horrorart #characterdesign #character #werewolf #horror #horrormovies #bodyhorror #bodyhorrorart #horrorartist #comic #comicart #comicbook #cartoon #cartoonist",
        "time": "2024-04-09T14:10:21.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/436036364_3509393905980211_5791664446068976456_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=sX79COgdpbMAb4Lt3WB&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfCujxH_h7JmOm7xPwF7oqJHAdego5EC1VaY41Li4-6OAQ&oe=662041BC&_nc_sid=cf751b",
        "author": "avril.en"
    },
    {
        "id": "C5h8LGnsVKc",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/436668482_342723994978162_242496840631269477_n.jpg?stp=c151.0.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=CIcfsqbvnhcAb7qc7kl&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfABjauNa6EIkq0bTOEvWXv9H24Dbj1784ghIAssXYKI3A&oe=662032F1&_nc_sid=9dc660",
        "alt": "Photo by Bettina Schipping Cartoons on April 08, 2024. May be an illustration of text.",
        "caption": "Spaßorientierte Zugvögel. #zugvögel #bordbistroparty #birdbistro #zugvögelkommenzurück #zugvögelkennenkeinegrenzen #bierchen #speisewagen #spassunterwegs #cartoon #witze #bettinaschippingcartoons",
        "time": "2024-04-09T06:15:41.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/436668482_342723994978162_242496840631269477_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=CIcfsqbvnhcAb7qc7kl&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfAcC3U7QDrmvg4oQpOpzN-NIALuiIcZgC5pPK3vffS__A&oe=662032F1&_nc_sid=cf751b",
        "author": "bettinaschipping"
    },
    {
        "id": "C5qEpkWuyiP",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/437190328_7201726883272920_3164777955293616489_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=NI0f3uVAsKgAb7O8h4d&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfBcy16KOFViPBWUv8gPLjdRnj3fq84u3z3caqUW0VzhNw&oe=66201553&_nc_sid=9dc660",
        "alt": "Photo by Lum Invader 💕 urusei yatsura 💕 on April 12, 2024. May be an anime-style image of costume and text.",
        "caption": "New collabo with kitty 💕 #hellokitty #lum #lamu #lumtheinvader #uruseiyatsura2024 #uruseiyatsura #anime #japan #waifus #waifugirl #waifu4laifu #animeart #animeedits #animeedit #うる星やつら #animetweets #animetwt #animerecommendation #animeart #rumikotakahashi #cartoon #2024 #secondseason",
        "time": "2024-04-12T10:03:40.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/437190328_7201726883272920_3164777955293616489_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=NI0f3uVAsKgAb7O8h4d&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfA17Mc5TMHSx4jiniLWqSwRuifggmdyOP_iHPbuUhF-yQ&oe=66201553&_nc_sid=cf751b",
        "author": "lum_only_you"
    },
    {
        "id": "C5ipdrWReO7",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/436545895_793526496005590_6469750662377467666_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=itIASs2KQl4Ab4z9b_W&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfDJNiw_UVFyYfcRRAL66m4KXJjZo1b1PW5CQZdmwkaZMQ&oe=662017AE&_nc_sid=9dc660",
        "alt": "Photo by Bryan Velayo on April 09, 2024. May be pop art.",
        "caption": "bunch of hairdos\n\n#characterdesign #characterart #artist #artistsoninstagram #cartoon #illustration #darkharvest",
        "time": "2024-04-09T12:51:26.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/436545895_793526496005590_6469750662377467666_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=itIASs2KQl4Ab4z9b_W&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfDAggQX6x1pxrR6NTB2FnQeUA4owhQ8W7PVAp9XEpejBA&oe=662017AE&_nc_sid=cf751b",
        "author": "roastedstix"
    },
    {
        "id": "C5pmobBN4oy",
        "imgUrl": "https://instagram-fpnq2--2-fna-fbcdn-net.translate.goog/v/t39.30808-6/436356298_18428883040062885_3000559696982709706_n.jpg?stp=c240.0.960.960a_dst-jpg_e15_s640x640&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=0lqBqhbjgYAAb4VWoqL&edm=AOUPxh0AAAAA&ccb=7-5&oh=00_AfBliR6BWz_XIdDSedjU6-XuRKtQPv7Ja0rBwLOdnn7V5Q&oe=6620238C&_nc_sid=9dc660",
        "alt": "Photo shared by Lectrr on April 11, 2024 tagging @destandaard. May be an image of poster and text that says 'NEUSCORRECTIE CONNER ROUSSEAU EN ALS IK NIET VERKOZEN RAAK STAP IK UIT DE POLITIEK! VOORL LECTRR'.",
        "caption": "#cartoon #vooruit (via www.lectrr.be)",
        "time": "2024-04-12T05:41:22.000Z",
        "postImgUrl": "https://instagram-fpnq2--2-fna-fbcdn-net.translate.goog/v/t39.30808-6/436356298_18428883040062885_3000559696982709706_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=0lqBqhbjgYAAb4VWoqL&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfCRi4-9fuFrrfhxOYtN9JM4CVc_LrgVf1_xnqppkFFKJw&oe=6620238C&_nc_sid=cf751b",
        "author": "lectrr"
    },
    {
        "id": "C5lfkltu12a",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/437060507_2853661968122512_2799139740165673415_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=EPMm7tYBAy4Ab6v0d1R&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfC6s-ObXcT8MT2Nkfq3PtZy0-lk7TgukNBw6WhDWLIygg&oe=66201B2A&_nc_sid=9dc660",
        "alt": "Photo by Brooke Bourgeois on April 10, 2024. May be a black-and-white image of 1 person.",
        "caption": "⭐️ ⭐️ ⭐️ an alt reality for the Sistine Chapel ⭐️ ⭐️ ⭐️ 🖌️\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n#sistinechapel #creationofadam #renaissance #michaelangelo #artist #vatican #painting #tnycartoons #cartoon #comic #illustration",
        "time": "2024-04-10T15:22:43.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t51.29350-15/437060507_2853661968122512_2799139740165673415_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=EPMm7tYBAy4Ab6v0d1R&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AfDE-bFuE9phuPaTETDPLHfTbPWrK0jPseR6ll8zASYTEA&oe=66201B2A&_nc_sid=cf751b",
        "author": "b_a_bourgeois"
    },
    {
        "id": "C5qM3n6ihSA",
        "imgUrl": "https://instagram-fpnq2--2-fna-fbcdn-net.translate.goog/v/t51.29350-15/437594488_441209381729185_5457139041553731796_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=xn8QNDOiZXsAb5HWxKx&edm=AOUPxh0BAAAA&ccb=7-5&oh=00_AfAde2AIg38B5u5apU0drBX-LPFHwl7S-hwbrPZRFLYjNg&oe=661C3707&_nc_sid=9dc660",
        "alt": "Tag that ❤️ Tag your tom and jerry Lover 😍 paid promo available \n🔰Keep supporting 🤟🔥\nFolllow and share krna na bhula 🔰\n\n#cartoonnetwork #tomandjerry #tomyjerry #classiccartoons #tomandjerrymemes #tomvejerry #cartoons #saturdaymorningcartoons #bugsbunny #toon #tomejerry #instavideo  #cartoonmovies  #oldcartoons #cartoon #jerry #love #cartoonvideo #tomnjerry #cartoonedits #funnycartoons #90scartoons #cartoondrawing #cartoonface #viral #video #explorepage #explore #trendingreels #trending",
        "caption": "Tag that ❤️ Tag your tom and jerry Lover 😍 paid promo available\n🔰Keep supporting 🤟🔥\nFolllow and share krna na bhula 🔰\n\n#cartoonnetwork #tomandjerry #tomyjerry #classiccartoons #tomandjerrymemes #tomvejerry #cartoons #saturdaymorningcartoons #bugsbunny #toon #tomejerry #instavideo #cartoonmovies #oldcartoons #cartoon #jerry #love #cartoonvideo #tomnjerry #cartoonedits #funnycartoons #90scartoons #cartoondrawing #cartoonface #viral #video #explorepage #explore #trendingreels #trending",
        "time": "2024-04-12T11:15:29.000Z",
        "postImgUrl": "https://instagram-fpnq2--2-fna-fbcdn-net.translate.goog/v/t51.29350-15/437595850_393033130293581_1756651590467440568_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.fpnq2-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=7pVwAToFDnwAb6aKP7b&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBuwaJ9VZiCJjQWW5DfB4hoU5GedSNL9dl33Ho4AaLO6A&oe=661C3348&_nc_sid=bc0c2c",
        "author": "tomjerry_8910"
    },
    {
        "id": "C5qZ0aEsOkV",
        "imgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t39.30808-6/437135773_18429062608047454_1008127687488868008_n.jpg?stp=c113.0.1213.1213a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=jdXzIsWcnoEAb7okouS&edm=AOUPxh0AAAAA&ccb=7-5&oh=00_AfBCJyrgeCFHOBgDp1Znak7GB5i-CVwpreY8I9-xPU1lxA&oe=66203199&_nc_sid=9dc660",
        "alt": "Photo by Lo Graf von Blickensdorf on April 12, 2024. May be an image of newsstand and text that says 'Die Diätratgeber finden keine Abnehmer, Chef. BUCHER'.",
        "caption": "Aus meinem Skizzenblock...\n\n#inventur #diätratgeber #intervallfasten #cartoon #buchhandlung #diät #buch #fett #übergewicht #skizzenblock #toonpool #diätbuch\n#followmeplease",
        "time": "2024-04-12T13:08:39.000Z",
        "postImgUrl": "https://instagram-fpnq2--1-fna-fbcdn-net.translate.goog/v/t39.30808-6/437135773_18429062608047454_1008127687488868008_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&_nc_ht=instagram.fpnq2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=jdXzIsWcnoEAb7okouS&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AfDCBI0zvuvQxel_Hgyx2PNNJxtD18ufzZRSv31RQU4lBA&oe=66203199&_nc_sid=cf751b",
        "author": "tortengraf"
    }
])

