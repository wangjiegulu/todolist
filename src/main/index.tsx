import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.css";
import { Input } from 'antd';

function Main(props: any) {

  useEffect(() => {
    // like `componentDidMount()`
    
    return ()=>{
        // like `componentWillUnmount()`
        
    }
  }, []);


  return (
    <div className={styles.root}>
        <label className={styles.title}>TO-DO LIST</label>
        <Input placeholder="Basic usage" />
    </div>
  );
}

Main.propTypes = {
};

Main.defaultProps = {
};

export default withRouter(Main);