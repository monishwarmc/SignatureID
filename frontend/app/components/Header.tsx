"use client"

// @ts-ignore
import {Button, Credentials} from '@web3uikit/core';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface HeaderProps {
    address: string;
    connect: () => void;
    balance: number;
    setBool: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Header: React.FC<HeaderProps> = ({address, connect, balance, setBool}) => {

    const [scroll, setScroll] = useState(0);
    const headerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
        setScroll(window.scrollY);
        };


        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [scroll]);

    useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const headerElement = headerRef.current ?? null;
        if (!headerElement) {
        return;
        }
        if (prevScrollPos < currentScrollPos) {
        headerElement.style.transform = "translateY(-100%)";
        } else {
        headerElement.style.transform = "translateY(0)";
        }
        prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
    }, []);

    let bal = `Wallet balance: ${balance} XDC`;
    return (
    <div ref={headerRef} className="top-0 z-10 fixed w-full bg-blue-900 flex justify-between items-center rounded-b-3xl transition-transform transform duration-200 ease-in-out">
        <Link
        href='#'
        onClick={() => setBool(true)}
        ><Image 
        alt="logo"
        src="/logo.png"
        className="px-3"
        width={166}
        height={169}
        />
        </Link>
        <h1 className="text-6xl text-sky-400">Signature ID</h1>
        <div className="px-6">
        {(address == "") ? (
            <Button
            onClick={connect}export default Header
            text="Connect Wallet"
            size="large"
            theme="primary"
            />
        ) : (
            <div>
                <Credentials
                onCopy={function noRefCheck(){}}
                onReveal={function noRefCheck(){}}
                text={address}
                title={bal}
                />
                <h1 className="text-xl"></h1>
            </div>
        )}
        </div>
    </div>
  )
}

export default Header