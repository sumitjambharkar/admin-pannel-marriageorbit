import React, { useState, useEffect } from 'react'
import useAuth from './context/useAuth'
import { db } from './firebase'
import Nav from './Nav'

const SendProfile = () => {

    const [data, setdata] = useState([])
    console.log(data);
    useEffect(() => {
        db.collection("Profile").onSnapshot(snapshot => (
            setdata(snapshot.docs.map((doc) => (doc.data())))
        ))
    }, [])

    const { name } = useAuth()
    console.log(name);
    function calculate_age(dob) {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    const dele = (uid)=>{
       db.collection("Profile").doc(uid).delete()
    }

    return (
        <>
            <Nav />
            <div style={{display:"flex",flexDirection:"column"}}>
            <button style={{visibility:"hidden"}}>.</button>
            <button style={{visibility:"hidden"}}>.</button>
            </div>
            
            <div className="Copy Data Copy Data Copy Data a3s aiL" id=":si"><span style={{ color: 'transparent', display: 'none!important', height: 0, opacity: 0, width: 0 }}>New Matches just for you. View photos &amp; profile information by logging in to your account.</span>
                <table style={{ background: '#f1f1f2', width: '100%', borderTop: '10px solid #f1f1f2' }} cellSpacing={0} cellPadding={0} border={0}>
                    <tbody><tr>
                        <td valign="top" align="center">
                            <table style={{ background: '#fff', maxWidth: '600px', border: '1px solid #dfe0e3', borderBottom: 'none' }} width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                <tbody><tr>
                                    <td style={{ paddingTop: '18px', paddingBottom: '18px', paddingLeft: '15px' }} valign="top" align="left">
                                        <img style={{ width: 180 }} src="https://marriageorbit.com/static/media/mrglogored.cb0f9e48304910de8186.png" className="CToWUd" data-bit="iit" alt='marrigeorbit' />
                                    </td>
                                </tr>
                                </tbody></table>
                            <table style={{ background: 'red', maxWidth: '600px', borderRight: '1px solid #ff5a60', borderLeft: '1px solid #ff5a60' }} width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                <tbody><tr>
                                    <td style={{ font: 'bold 22px arial', lineHeight: '25px', color: '#fff', paddingTop: '9px', paddingBottom: '9px', paddingLeft: '14px' }} valign="top" align="left">
                                        New Matches
                                    </td>
                                </tr>
                                </tbody></table>
                            <table style={{ maxWidth: '600px', border: '1px solid #dfe0e3', borderTop: 'none', borderBottom: '2px solid #dfe0e3', background: '#fff' }} width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                <tbody><tr>
                                    <td valign="top" style={{ paddingTop: '20px', paddingRight: '8px', paddingLeft: '8px' }}>
                                        <table width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                            <tbody><tr>
                                                <td valign="top" style={{ font: 'normal 18px arial', lineHeight: '21px', color: '#72727d', textAlign: 'left', borderBottom: '1px solid #dfe0e3', paddingBottom: '20px' }}>
                                                    Hi {name}, Be the first to connect to these recently joined matches who meet your preferences.
                                                </td>
                                            </tr>
                                            </tbody></table>
                                        {/* Start Box */}
                                        {data.map((doc) => (
                                            <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                                <tbody><tr>
                                                    <td style={{ width: '110px', paddingTop: '15px' }} valign="top" align="left">
                                                        <div style={{ border: '1px solid #dfe0e3', height: '144px' }}>
                                                            <a href={`https://marriageorbit.com/view-profile/${doc.uid}`}>
                                                                <img src={doc.image} style={{ display: 'block' }} alt='image' height={144} width={108} border={0} className="CToWUd" data-bit="iit" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td style={{ maxWidth: '458px', paddingTop: '15px', paddingLeft: '10px' }} valign="top" align="left">
                                                        <table cellSpacing={0} cellPadding={0} width="100%" border={0}>
                                                            <tbody><tr>
                                                                <td style={{ font: 'bold 12px arial ', lineHeight: '19px' }} valign="top">
                                                                    <a style={{textDecoration:"none"}} href={`https://marriageorbit.com/view-profile/${doc.uid}`}>
                                                                        {doc.displayName.toUpperCase()}</a>
                                                                </td>
                                                            </tr>
                                                                <tr>
                                                                    <td style={{ font: 'normal 13px arial', lineHeight: '16px', color: '#72727d', paddingTop: '2px' }} valign="top">
                                                                        {calculate_age(new Date(doc.birth))},{doc.height},{doc.community},
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ font: 'normal 13px arial', lineHeight: '16px', color: '#72727d', paddingTop: '2px' }} valign="top">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top" style={{ font: 'normal 13px arial', lineHeight: '16px', color: '#72727d', paddingTop: '2px' }}>
                                                                        {doc.qaulification},
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ font: 'normal 13px arial', lineHeight: '16px', color: '#72727d', paddingTop: '2px' }} valign="top">
                                                                        {doc.state}, {doc.country}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top" style={{ font: 'italic 13px arial', lineHeight: '16px', color: '#95959d', paddingTop: '5px', paddingBottom: '8px' }}>
                                                                        "{doc.about.substr(0,50)}" <a style={{textDecoration:"none"}} href={`https://marriageorbit.com/view-profile/${doc.uid}`}>Read more</a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td valign="top">
                                                                        <table cellSpacing={0} cellPadding={0} width={95} border={0}>
                                                                            <tbody><tr>
                                                                                <td style={{ font: 'normal 15px arial', color: '#fff', lineHeight: '18px', background: 'red', borderRadius: '2px', border: '1px solid red', textAlign: 'center', paddingTop: '5px', paddingBottom: '5px' }} valign="top">
                                                                                    <a onClick={()=>dele(doc.uid)} href={`https://marriageorbit.com/view-profile/${doc.uid}`} title="Connect" rel="noreferrer" style={{ outline: 'none', textDecoration: 'none', color: '#fff' }} target="_blank">Connect</a>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody></table>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                        <td colSpan={2} style={{ borderBottom: '1px solid #dfe0e3', fontSize: '2px', paddingTop: '18px', paddingBottom: '18px' }} valign="top">
                                                            &nbsp;
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ))}

                                        {/* End Box */}
                                        <table width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                            <tbody><tr>
                                                <td valign="top" height={18} />
                                            </tr>
                                                <tr>
                                                    <td valign="top" style={{ textAlign: 'center', font: 'normal 18px arial', lineHeight: '21px', background: '#dbf7fb', border: '1px solid #dbf7fb', paddingTop: '11px', paddingRight: '5px', paddingBottom: '14px', paddingLeft: '5px' }} colSpan={2}>
                                                        <a style={{ color: 'red', textDecoration: 'none', outline: 'none' }} href="https://marriageorbit.com">View All Matches</a>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        <table width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                            <tbody><tr>
                                                <td valign="top" style={{ font: 'normal 14px arial', lineHeight: '20px', color: '#72727d', textAlign: 'center', paddingTop: '6px', paddingRight: '5px', paddingBottom: '19px', paddingLeft: '5px' }}>
                                                    Not happy with your matches?<br />
                                                    <a style={{ color: 'red', textDecoration: 'none', outline: 'none' }} href="https://marriageorbit.com">Edit Partner Preferences</a>
                                                </td>
                                            </tr>
                                            </tbody></table>
                                    </td>
                                </tr>
                                </tbody></table>
                        </td>
                    </tr>
                    </tbody></table>
                <table width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ background: '#f1f1f2' }}>
                    <tbody><tr>
                        <td valign="top" align="center" style={{ paddingBottom: '10px' }}>
                            <u />
                            <table width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ background: '#dfe0e3', maxWidth: '600px', margin: '0 auto' }}>
                                <tbody><tr><td><u />
                                </td></tr><tr>
                                        <td valign="top" style={{ paddingRight: '8px', paddingLeft: '8px' }}>
                                            <table cellSpacing={0} cellPadding={0} border={0} style={{ width: '100%' }}>
                                                <tbody><tr>
                                                    <td style={{ font: 'normal 11px arial', lineHeight: '17px', color: '#95959d', textAlign: 'center', paddingTop: '12px', paddingRight: '10px', paddingBottom: '12px', paddingLeft: '10px' }}>
                                                        Don't find this email useful? <a href="https://marriageorbit.com/">Edit Email Preferences</a>
                                                    </td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                </tbody></table>
                        </td>
                    </tr>
                    </tbody></table>
                <img src="https://ci4.googleusercontent.com/proxy/chJsrAWj-vIqjTOPVajzgCFRhbdxPijk1Ii5pC7_VsskDK86rF6HkTAbtp78gdBFvDpkK-dBKS7gQKQ20ns5XFwEWA9Iy2IVjbsNYXmwW8_9FzS40cKtlYGbTFtWb6A-ngRIu1BtRO4g4zCfqXZsxWyNfwq3mFM_evOzl5jMfm9jzHUARjKQiftugWLQkqJ7Ldj_nNJm1NQ970C6XRv_ZZhlXTRjUQlKdPIM5ERC3j0fsTC5ulNitm5MCe4BkU6p3o9YLetWzwBhxoONK-x5x0NW815OpY8N7hbLODn5NrwOjfaFMMHTWXJneuYeZCKlXgPC6YRjv3_JgpyBHk4wao1kK5yBoCzyAUQ3iOitsucE6jxLtWLpLtxXg2gI4hk_Wo7qM5Xri1rF6MMilhF3zFvDzRPcMV5YLAZw4vI7VUr2pHE5_9BGD_zhkVt374AD1Sz2PXmTlS8TVwvkIY-hMPL8W8YzB2TwYs4x044qEeZPJhP7xKdllfX2YfS-HdnxPe4omvYc8-EI8A4i8nlfjstZ-VLGdR-Vgvc4bjvgwUk53W-aMhJjqtKvsAq3LfI4B_x104b1JrqPUXyV3GTP5M459t6HVjPL7fQ649ziUisnEqbLxQ=s0-d-e1-ft#https://tracking.shaadi.com/com.snowplowanalytics.iglu/v1?schema=iglu:com.shaadi/campaign_performance/jsonschema/1-0-0&receiver=ESH23933652&campaign_id=NewMatchesFor0_15Users_mail&event_action=open&hash_id=RVNIMjM5MzM2NTJ8TmV3TWF0Y2hlc0ZvcjBfMTVVc2Vyc19tYWlsfDIwMjMtMDItMTN8MC43NDY5NDIwMCAxNjc2MjkwNTExfGxpdmV8TnxOfE58TnxtYWlsfHNjaGVkdWxlZHxkeW5hbWljfElTVA==&batch_creation_date=2023-02-13&app_type=N&app_platform=N&device=N&channel=mail&device_id=N" className="CToWUd" data-bit="iit" alt='' /><div className="yj6qo" /><div className="adL">
                </div></div>
        </>
    )
}

export default SendProfile