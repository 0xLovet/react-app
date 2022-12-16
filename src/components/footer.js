import React, { Component } from 'react';
import Icons from './icons';


class Footer extends Component{
    render() {
        return(
            <footer className="bg-dark text-center text-white footer">
                <div className="container p-4 pb-0">
                    <section className="mb-4">
                        <Icons/>
                    </section>
                </div>
                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    © 2022 Copyright: 
                    <a className="text-white" href="https://0xlovet.com/">0xlovet.com</a>
                </div>
            </footer>
        );

    }
    
}

export default Footer;