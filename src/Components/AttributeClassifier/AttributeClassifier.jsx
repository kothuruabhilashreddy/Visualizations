import React from 'react';
import './AttributeClassifier.css'

const AttributeClassifier = () => {
    return (
        <div class="att-cls">
            <div className="cls-header">
                <div className="heading-cls">
                    <header>Classify the attributes accordingly</header>
                </div>
                <div className="action-cls">
                    <button>next </button>
                </div>
            </div>
            <div className="container-cls">
                <div className="num-cls">

                </div>
                <div className="att-ls">

                </div>
                <div className="cat-cls">

                </div>
            </div>
        </div>
    )
}

export default AttributeClassifier;