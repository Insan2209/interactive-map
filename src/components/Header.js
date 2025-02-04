function Header() {
    return (
        //returns div with img (logo) and site's name, there is also sign in button to the right
        <div className="flex flex-wrap w-full h-16 bg-palette1-d">
            <img src="/img/Logo.png" alt="Pirate's Isle Logo" className="h-16 p-2"></img>
            <p className="font-semibold text-2xl md:text-3xl p-1 my-auto text-palette1-a font-lacquer">Pirate's Isle</p>
            <button className="ml-auto m-3 px-5 text-palette1-a bg-palette2-e hover:bg-palette2-b rounded-lg transition ease-in-out duration-500 font-lacquer">Sign In</button>
        </div>
    );  
}

export default Header;