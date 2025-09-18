import * as THREE from 'three';

export class Header {
    constructor(container) {
        this.container = container;
    }


    createNavItem(className, imgSrc, text, href) {
        const navItem = document.createElement('a');
        navItem.className = `nav-item ${className}`;
        navItem.href = href;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = text;
        
        const p = document.createElement('p');
        p.className = 'nav-text';
        p.textContent = text;
        
        navItem.appendChild(img);
        navItem.appendChild(p);
        
        return navItem;
    }
}
