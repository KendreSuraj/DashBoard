import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import PackageDetails from '../PackageDetails';
import RulesStep from '../Rules';
import OffersStep from '../Offers';

import './PackagesSteps.style.css';

const PackagesSteps = () => {
    const packageType = localStorage.getItem('packageDetail')
    const [packageDetails, setPackageDetails] = useState(true)
    const [rules, setRules] = useState(false);
    const [offers, setOffers] = useState(false);
    const [packagesubmitted, setPackagesSubmitted] = useState(false)
    const handleClick = (text) => {
        if (text === "package") {
            localStorage.setItem('packageDetail', 'add');
            setPackageDetails(true);
            setRules(false);
            setOffers(false);

        }
        if (text === "rules") {
            setPackageDetails(false);
            setRules(true);
            setOffers(false);
        }
        if (text === "offer") {
            setPackageDetails(false);
            setRules(false);
            setOffers(true);
        }
    }

    return (
        <div className='container'>
            <h3>Packages Steps</h3>
            <div className='wrapper'>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick("package")}
                >
                    Add Package details
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!packagesubmitted && packageType!=="edit" }
                    onClick={() => handleClick("rules")}

                >
                    Add Rules
                </Button>
                {/* <Button
                    variant="contained"
                    color="primary"
                    disabled={!packagesubmitted}
                    onClick={()=>handleClick("offer")}
                >
                    Add Offers
                </Button> */}
            </div>
            {packageDetails && !packagesubmitted && <PackageDetails setPackagesSubmitted={setPackagesSubmitted} />}
            {(packagesubmitted || rules) && <RulesStep />}
            {offers && <OffersStep />}
        </div>
    )
}

export default PackagesSteps