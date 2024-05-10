// RulesStep.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RuleItem from './RuleItem';
import { getToken } from '../../../components/common/userLocalStorageUtils';
import { Button } from '@mui/material';

const RulesStep = ({ setPackagesSubmitted }) => {
  const [rules, setRules] = useState([{ productId: "", notIncludedProductIds: [] }]);
  const [names, setNames] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get(`${apiUrl}/api/v1/admin/product/list`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const product = await res.data.productList;
    setNames(product.map(obj => obj.id))
  }

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
        productId: rule.productId,
        filter: rule.notIncludedProductIds
      }));

      const body = {
        packageId: 1,
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

      const response = await axios.post(
        `${apiUrl}/api/v1/admin/package/add-rule`, transformedObject, {
        headers: {
          token: getToken(),
        }
      });

      if (response?.status === 201 || response?.status === 200) {
        console.log("abc")
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.response?.data?.status?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Rules Details</h3>
      <div style={{display:"flex", flexDirection:"column",gap:"20px"}}>
        {rules.map((rule, index) => (
          <RuleItem
            key={index}
            index={index}
            rule={rule}
            onChange={handleRuleChange}
            names={names}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ width: '12%', fontSize: '15px' }}
      >
        Add Rules
      </Button>
    </>
  );
};

export default RulesStep;
