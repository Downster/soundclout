const genreNameToNum = (genre) => {
    switch (genre) {
        case 'None':
            return 1;
        case 'Alternative Rock':
            return 2;
        case 'Ambient':
            return 3;
        case 'Classical':
            return 4;
        case 'Country':
            return 5;
        case 'Dance & EDM':
            return 6;
        case 'Dancehall':
            return 7;
        case 'Deep House':
            return 8;
        case 'Disco':
            return 9;
        case 'Drum & Bass':
            return 10;
        case 'Dubstep':
            return 11;
        case 'Electronic':
            return 12;
        case 'Folk & Singer-Songwriter':
            return 13;
        case 'Hip-hop & Rap':
            return 14;
        case 'House':
            return 15;
        case 'Indie':
            return 16;
        case 'Jazz & Blues':
            return 17;
        case 'Latin':
            return 18;
        case 'Metal':
            return 19;
        case 'Piano':
            return 20;
        case 'Pop':
            return 21;
        case 'R&B & Soul':
            return 22;
        case 'Reggae':
            return 23;
        case 'Reggaeton':
            return 24;
        case 'Rock':
            return 25;
        case 'Soundtrack':
            return 26;
        case 'Techno':
            return 27;
        case 'Trance':
            return 28;
        case 'Triphop':
            return 29;
        case 'World':
            return 30;
    }
}

export default genreNameToNum