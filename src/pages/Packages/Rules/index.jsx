// RulesStep.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RuleItem from './RuleItem';
import { getToken } from '../../../components/common/userLocalStorageUtils';
import { Button } from '@mui/material';

const RulesStep = () => {
  const [rules, setRules] = useState([{ productId: "", notIncludedProductIds: [] }]);
  const [names, setNames] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const packageType = localStorage.getItem('packageDetail');

  const [id, setId] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleAddRuleItem = () => {
    setRules([...rules, { productId: "", notIncludedProductIds: [] }]);
  };

  const handleRuleChange = (index, ruleData) => {
    const newRules = [...rules];
    newRules[index] = ruleData;
    setRules(newRules);
  };

  const handleSubmit = async () => {
    try {
      const formattedRules = rules.map(rule => ({
        productId: parseInt(rule.productId.split(".")[0]),
        filter: rule.notIncludedProductIds.map((item) => parseInt(item.split(".")[0]))
      }));

      const body = {
        packageId: id,
        rules: formattedRules
      };


      let transformedObject = {
        "packageId": body.packageId,
        "rules": []
      };

      body.rules.forEach((rule, index) => {
        transformedObject.rules[index] = {
          "productId": rule.productId,
          "filter": rule.filter
        };
      });

      transformedObject.rules=transformedObject.rules[0].filter.length===0?[]:transformedObject.rules

      const response = await axios.post(
        `${apiUrl}/api/v1/admin/package/add-rule`, transformedObject, {
        headers: {
          token: getToken(),
        }
      });

      if (response?.status === 201 || response?.status === 200) {
        alert("Rules added successfully!!");
        window.location.href = `https://test.partner.avataarskin.com/packages`
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.response?.data?.status?.message);
    }
  };

  const handleDeleteRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
};

  const fetchParticularData = async () => {
    if (id != undefined) {
      const res = await axios.get(`${apiUrl}/api/v1/admin/package/detail/${id}`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      if (res.data.data.products.length > 0 && !res.data.data.bodyParts) {
        setNames(res.data.data.products.map((item) => `${item.productId}. ${item.name}`))
      }
      else {
        setNames(res.data.data.products.map((item) => `${item.id}. ${item.name}`))
      }

      if (packageType === "edit") {

        const rulesRes = await axios.get(`${apiUrl}/api/v1/admin/package/get-rules/${id}`, {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        })

        if (rulesRes.data.data) {
          const alreadyRules = rulesRes.data.data.rules.map(rule => ({
            productId: `${rule.productId}. ${rule.name}`,
            notIncludedProductIds: rule.filter.map((item) => `${item.id}. ${item.name}`)
          }));
          setRules(alreadyRules)
        }
      }
    }
  }

  console.log(rules)

  useEffect(() => {
    const packageType = localStorage.getItem('packageDetail');

    const id = packageType === "edit" ? localStorage.getItem("packageEdit") : localStorage.getItem('packageId');
    setId(parseInt(id, 10));
  })

  useEffect(() => {
    fetchParticularData();
  }, [id])
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Rules Details</h3>
      {names.length > 0 ?
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {rules.map((rule, index) => (
              <RuleItem
                key={index}
                index={index}
                rule={rule}
                onChange={handleRuleChange}
                names={names}
                productNames={productNames}
                setProductNames={setProductNames}
                allRules={rules}
                onDelete={handleDeleteRule}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{ width: '5%', fontSize: '20px' }}
            onClick={handleAddRuleItem}
          >
            +
          </Button>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ width: '12%', fontSize: '15px' }}
            >
              Add Rules
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ width: '16%', fontSize: '15px', marginLeft: "20px" }}
            >
              Skip Adding Rules
            </Button>
          </div>
        </> : <p>No Products added</p>}
    </>
  );
};

export default RulesStep;
