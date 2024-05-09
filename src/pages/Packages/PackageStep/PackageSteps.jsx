import React, { useState } from 'react';
import './PackagesSteps.style.css';
import { Button } from '@mui/material';
import PackageDetails from '../PackageDetails';
import RulesStep from '../Rules';
import OffersStep from '../Offers';

const PackagesSteps = () => {
    const [packageDetails, setPackageDetails] = useState(false);
    const [rules, setRules] = useState(false);
    const [offers, setOffers] = useState(false);
    const [packagesubmitted, setPackagesSubmitted] = useState(false)
    const handleClick = (text) => {
        if (text === "package") {
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
                    Package details
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!packagesubmitted}
                    onClick={() => handleClick("rules")}

                >
                    Rules
                </Button>
                {/* <Button
                    variant="contained"
                    color="primary"
                    disabled={!packagesubmitted}
                    onClick={()=>handleClick("offer")}
                >
                    offers
                </Button> */}
            </div>
            {packageDetails && <PackageDetails setPackagesSubmitted={setPackagesSubmitted} />}
            {rules && <RulesStep />}
            {offers && <OffersStep />}
        </div>
    )
}

export default PackagesSteps