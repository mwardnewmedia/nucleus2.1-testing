let EnquiryStorage = {
    getData: function (key, data_key) {
        return this.retrieve(key)[data_key]
    },
    hasData: function (key, data_key) {
        try {
            let storage = JSON.parse(localStorage.getItem(key));
            if (typeof storage > "u" || typeof storage[data_key] > "u" || storage[key] === !1) return !1;
            if (storage[data_key].length) return storage[data_key].length;
            for (let object_key in storage[data_key])
                if (typeof storage[data_key] == "object" && storage[data_key].hasOwnProperty(object_key) && (typeof storage[data_key][object_key].id < "u" || storage[data_key][object_key].id)) return !0;
            return !1
        } catch (err) {
            console.error("error in EnquiryStorage.hasData", err)
        }
        return !1
    },
    setData: function (key, data) {
        let storage = this.retrieve();
        return storage[key] = data, this.store(storage)
    },
    retrieve: function (key, fallback) {
        let storage = {};
        try {
            if (storage = JSON.parse(localStorage.getItem(key)), !storage) return fallback
        } catch { }
        return storage
    },
    store: function (key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data))
        } catch (error) {
            return console.error(error), !1
        }
        return !0
    }
};
window.enquiry_user_storage = function (key, defaults) {
    let storage = {
        _key: key,
        init: function (key2, defaults2) {
            this._key = key2;
            let storage2 = {};
            try {
                storage2 = JSON.parse(localStorage.getItem(this._key))
            } catch { }
            storage2 || EnquiryStorage.store(key2, defaults2)
        },
        get: function (key2) {
            return EnquiryStorage.getData(this._key, key2)
        },
        getAll: function () {
            return EnquiryStorage.retrieve(this._key)
        },
        setObject: function (data) {
            return EnquiryStorage.store(this._key, data)
        }
    };
    return storage.init(key, defaults), storage
}("enquiry_user", {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    location_id: 0
}), window.enquiry_product_storage = function (key, defaults) {
    let storage = {
        _key: key,
        _defaults: {},
        init: function (key2, defaults2) {
            this._key = key2, this._defaults = defaults2;
            let storage2 = {};
            try {
                storage2 = JSON.parse(localStorage.getItem(this._key))
            } catch { }
            storage2 || EnquiryStorage.store(this._key, defaults2)
        },
        addProduct: function (data) {
            if (!data) return;
            let storage2 = EnquiryStorage.retrieve(this._key, []);
            storage2.push(data), EnquiryStorage.store(this._key, storage2)
        },
        editOrAddProduct: function (editing_variant) {
            let storage2 = EnquiryStorage.retrieve(this._key, []);
            for (let i = 0; i < storage2.length; i++) {
                let variant2 = storage2[i];
                if (editing_variant.variant_id == variant2.variant_id) {
                    storage2[i] = editing_variant, EnquiryStorage.store(this._key, storage2);
                    return
                }
            }
            storage2.push(editing_variant), EnquiryStorage.store(this._key, storage2)
        },
        removeProduct: function (index) {
            let storage2 = EnquiryStorage.retrieve(this._key, []);
            if (!storage2.length) return !0;
            storage2.splice(index, 1), EnquiryStorage.store(this._key, storage2)
        },
        getVariant: function (variant_id2) {
            let storage2 = EnquiryStorage.retrieve(this._key, []);
            if (!storage2.length) return !1;
            let return_variant = !1;
            return storage2.forEach((variant2, index) => {
                variant2 ? variant2.variant_id == variant_id2 && (return_variant = variant2) : this.removeProduct(index)
            }), return_variant
        },
        getAll: function () {
            return EnquiryStorage.retrieve(this._key, [])
        },
        clear: function () {
            EnquiryStorage.store(this._key, this._defaults)
        }
    };
    return storage.init(key, defaults), storage
}("enquiry_products", []);
let EnquiryTemplate = function (target_html_id, template_source, template_description) {
    let app = {
        compiled: !1,
        target: !1,
        init: function (target_html_id2, template_source2, template_description2) {
            if (this.target = document.getElementById(target_html_id2), !this.target) throw new Error(`Could not find the html element (${target_html_id2}) for ${template_description2}`);
            if (!template_source2) throw new Error("Could not find the template for " + template_description2);
            this.compiled = template_source2
        },
        render: function (data) {
            return typeof data > "u" && (data = {}), this.target.innerHTML = this.compiled(data), !0
        }
    };
    return app.init(target_html_id, template_source, template_description), app
},
    EnquiryTemplates = {};
EnquiryTemplates.product = function (data, index) {
    if (!data) return "";
    let odd_or_even = "odd";
    index % 2 === 0 && (odd_or_even = "even");
    let product_link = `${enquiry_options.prefix}/products/${data.handle}`,
        variant_title = data.product;
    typeof data.handle < "u" && (variant_title = `
            <a href="${product_link}?variant=${data.variant_id}"
               class="enquiry-product-link enquiry-product-link-style"
            >`, data.variant == "Default Title" ? variant_title += "n/a" : variant_title += data.variant, variant_title += "</a>");
    
    // Check global settings for hiding prices/rental rates
    let shouldHidePrice = false;
    if (typeof enquiry_options !== 'undefined' && enquiry_options.settings) {
        shouldHidePrice = enquiry_options.settings.hide_price || enquiry_options.settings.rental_rates;
    }
    
    let formatted_price = shouldHidePrice ? "" : (parseFloat(data.price.replace(/,/g, '')) > 0 ? data.formatted_price : "n/a");
    let thumbnail = "",
        product_title_colspan = shouldHidePrice ? 4 : 5;
    
    return typeof data.image < "u" && data.image.length && (thumbnail = `
            <td class="enquiry-thumbnail-column">
                <img class="enquiry-thumbnail" src="${data.image}" alt=""/>
            </td>`, product_title_colspan = shouldHidePrice ? 3 : 4), `
    
        <tr class="enquiry-row enquiry-row-${odd_or_even}" data-index="${index}">
            ${thumbnail}
            <td class="enquiry-product" colspan="${product_title_colspan}">
                <a href="${product_link}" class="enquiry-product-link enquiry-product-link-style">
                    ${data.product}
                </a>
            </td>
        </tr>
        <tr class="enquiry-row enquiry-row-${odd_or_even}" data-index="${index}">
            <td class="enquiry-product" colspan="2">${variant_title}</td>
            ${shouldHidePrice ? '' : `<td class="enquiry-price">${formatted_price}</td>`}
            <td class="enquiry-quantity">${data.quantity}</td>
            <td class="enquiry-manage">
                <button class="enquiry-button-remove" type="button"
                    data-variant-id="${data.variant_id}"
                >&times;</button>
            </td>
        </tr>
    `
}, EnquiryTemplates.product_list = function (data) {
    document.querySelector(".rental-request-count").innerText = data.length;
    const rentalRequestCountElement = document.querySelector(".rental-request-count");
    if (data.length === 0 ? rentalRequestCountElement.classList.add("hide-rental-count") : rentalRequestCountElement.classList.remove("hide-rental-count"), data.length === 0) return '<div class="no-rental-items-alert"><h4>Oops! It seems no rental items have been selected yet.</h4><p>Take a moment to explore our rental catalog and choose items to request.</p></div>';
    {
        // Check global settings for hiding prices/rental rates
        let shouldHidePrice = false;
        if (typeof enquiry_options !== 'undefined' && enquiry_options.settings) {
            shouldHidePrice = enquiry_options.settings.hide_price || enquiry_options.settings.rental_rates;
        }
        
        let return_html = `
            <label class="request-availability-form-label">Rental Cart</label> 
            <table class="enquiry-products js-enquiry-products">
                <thead>
                    <tr>
                        <th colspan="2">
                            <span class="request-availability-form-label enquiry-sr-only">Image or </span>
                            <span class="request-availability-form-label">Product / Duration</span>
                        </th>
                        ${shouldHidePrice ? '' : '<th class="request-availability-form-label">Price</th>'}
                        <th title="Quantity" class="request-availability-form-label">Qty</th>
                        <th><span class="request-availability-form-label enquiry-sr-only">Manage</span></th>
                    </tr>
                </thead>
                <tbody>
        `,
            running_total = 0;
        return data.forEach((product, index) => {
            if (product) {
                if (!shouldHidePrice) {
                    const priceWithoutCommas = product.price.replace(/,/g, '');
                    const total_price = parseFloat(priceWithoutCommas) * (product.quantity || 1);
                    running_total += total_price;
                }
                return_html += EnquiryTemplates.product(product, index);
            }
        }), !shouldHidePrice && running_total > 0 && (return_html += `
                <!--<tfoot>
                    <tr>
                        <th colspan="2">&nbsp;</th>
                        <th class="enquiry-subtotal">Subtotal</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th colspan="2">&nbsp;</th>
                        <th class="enquiry-running-total">$${running_total.toFixed(2)}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>-->
                
                <tfoot>
                    <tr>
                        <td class="enquiry-subtotal request-availability-form-label" colspan="${shouldHidePrice ? '5' : '6'}" style="text-align: right;"><span style="margin-right:20px;">Subtotal:</span> $${running_total.toFixed(2)}</td>
                    </tr>
                </tfoot>`), return_html += "</tbody></table>", return_html
    }
}, EnquiryTemplates.form_link_button = function (data) {
    return data.length ? `
              <a class="enquiry-submit-link btn" style="width:100%;margin-top:10px;" href="${Enquiry.enquiry_form_url}">
                  Submit Request
              </a>
          ` : ""
}, EnquiryTemplates.flyout_list = function (data) {
    let html = EnquiryTemplates.product_list(data);
    return html += " " + EnquiryTemplates.form_link_button(data), html
};
let EnquiryFlyout = function () {
    return {
        is_open: !1,
        html_flyout: !1,
        html_product_list: !1,
        template_flyout_list: !1,
        init: function () {
            let self = this;
            self.html_flyout = document.getElementById("js-enquiry-flyout"), self.html_product_list = document.getElementById("js-enquiry-product-list"), self.template_flyout_list = new EnquiryTemplate("js-enquiry-product-list", EnquiryTemplates.flyout_list, "Enquiry Rental Flyout Menu"), EnquiryFlyout.render(), document.addEventListener("EnquiryProductsUpdated", () => {
                EnquiryFlyout.render()
            })
        },
        close: function () {
            this.is_open = !1, this.html_flyout.classList.remove("enabled-shift")
        },
        open: function () {
            this.is_open = !0, this.html_flyout.classList.add("enabled-shift")
        },
        toggle: function () {
            this.is_open ? this.close() : this.open()
        },
        render: function () {
            this.template_flyout_list.render(enquiry_product_storage.getAll())
        }
    }
}(),
    EnquiryForm = function () {
        return {
            html_form: !1,
            html_products_input: !1,
            html_products_list: !1,
            template_product_list: !1,
            init: function () {
                let self = this;
                
                self.html_form = document.getElementById("js-enquiry-request-form"), self.html_products_input = document.getElementById("js-enquiry-form-products"), self.html_products_input.value = JSON.stringify(enquiry_product_storage.getAll()), self.template_product_list = new EnquiryTemplate("js-enquiry-form-list", EnquiryTemplates.product_list, "Enquiry Rental Form Product List"), self.template_product_list.render(enquiry_product_storage.getAll()), document.addEventListener("EnquiryProductsUpdated", () => {
                    let products = enquiry_product_storage.getAll();
                    self.html_products_input.value = JSON.stringify(products), self.template_product_list.render(products)
                }), this.populate_form(), this.html_form.addEventListener("submit", event => (event.preventDefault(), this.send_request(), this.save_user(), !1))
            },
            populate_form: function () {
                let user = enquiry_user_storage.getAll();
                user && Object.keys(user).forEach(function (key) {
                    let value = user[key];
                    if (key == "location" || key == "delivery" || key == "state") {
                        let select = document.getElementById("enquiry-" + key);
                        if (select) {
                            select.value = value;
                            let options = select.children;
                            for (let i = 0; i < options.length; i++) {
                                let option = options.item(i);
                                value == option.value ? option.selected = !0 : option.selected = !1
                            }
                        }
                    } else document.querySelector(`input[name=${key}]`) && (document.querySelector(`input[name=${key}]`).value = value)
                })
            },
            send_request: function () {
                let inputs = this.html_form.elements,
                    data = {};
                
                for (let i = 0; i < inputs.length; i++) {
                    let input = inputs[i];
                    input.name && (data[input.name] = input.value)
                }
                
                fetch(Enquiry.enquiry_api_url, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return response.json()
                }).then(function (json) {
                    if (json.status == "OK") {
                        document.getElementById("enquiry-form-column").innerHTML = json.response_text,
                            document.querySelector("#enquiry-form-list-column").style.display = "none";
                            document.querySelector(".enquiry-confirmation-table").style.width = "100%";
                            
                        // Hide pricing in confirmation table if global settings are enabled
                        if (typeof enquiry_options !== 'undefined' && enquiry_options.settings && 
                            (enquiry_options.settings.hide_price || enquiry_options.settings.rental_rates)) {
                            
                            // Wait a moment for DOM to be fully updated, then hide pricing elements
                            setTimeout(() => {
                                const confirmationTable = document.querySelector('.enquiry-confirmation-table');
                                if (confirmationTable) {
                                    
                                    // Find and hide specific pricing columns (but keep duration)
                                    let columnsToHide = [];
                                    const headerRow = confirmationTable.querySelector('tr');
                                    if (headerRow) {
                                        const headers = headerRow.querySelectorAll('th');
                                        headers.forEach((header, index) => {
                                            const text = header.textContent.toLowerCase().trim();
                                            // Hide price, cost, rate, total, tax columns but NOT duration
                                            if ((text.includes('price') || text.includes('cost') || text.includes('rate') || 
                                                 text.includes('total') || text.includes('tax') || text.includes('amount')) && 
                                                !text.includes('duration') && !text.includes('period') && !text.includes('term')) {
                                                columnsToHide.push(index);
                                                header.style.display = 'none'; // Hide the header
                                            }
                                        });
                                    }
                                    
                                    // Hide cells in the identified pricing columns
                                    if (columnsToHide.length > 0) {
                                        const allRows = confirmationTable.querySelectorAll('tr');
                                        allRows.forEach(row => {
                                            columnsToHide.forEach(columnIndex => {
                                                const cell = row.children[columnIndex];
                                                if (cell && (cell.tagName.toLowerCase() === 'td' || cell.tagName.toLowerCase() === 'th')) {
                                                    cell.style.display = 'none';
                                                }
                                            });
                                        });
                                    }
                                    
                                    // Also hide individual cells that contain pricing (fallback method)
                                    const allCells = confirmationTable.querySelectorAll('td');
                                    allCells.forEach(cell => {
                                        const text = cell.textContent.trim().toLowerCase();
                                        const cellContent = cell.textContent.trim();
                                        
                                        // Check for currency symbols or price patterns, but exclude duration-related content
                                        if ((cellContent.includes('$') || /^\$?\d+\.?\d*$/.test(cellContent) || 
                                            cellContent.match(/^\d+\.\d{2}$/)) && 
                                            !text.includes('day') && !text.includes('week') && !text.includes('month') && 
                                            !text.includes('hour') && !text.includes('duration') && !text.includes('period')) {
                                            cell.style.display = 'none';
                                        }
                                    });
                                    
                                    // Hide any elements with price-related classes or IDs (but not duration)
                                    const priceElements = confirmationTable.querySelectorAll('.price, .enquiry-price, .total, .subtotal, .tax, .amount, [class*="price"], [id*="price"], [class*="total"], [id*="total"], [class*="tax"], [id*="tax"]');
                                    priceElements.forEach(element => {
                                        const elementText = element.textContent.toLowerCase();
                                        // Only hide if it doesn't contain duration-related keywords
                                        if (!elementText.includes('duration') && !elementText.includes('period') && 
                                            !elementText.includes('day') && !elementText.includes('week') && 
                                            !elementText.includes('month') && !elementText.includes('hour')) {
                                            element.style.display = 'none';
                                        }
                                    });
                                    
                                    // Hide specific pricing rows (tax, total, subtotal)
                                    const allRows = confirmationTable.querySelectorAll('tr');
                                    allRows.forEach(row => {
                                        const rowText = row.textContent.toLowerCase().trim();
                                        
                                        // Check if this row contains tax, total, or subtotal information
                                        const strongElements = row.querySelectorAll('strong');
                                        const hasStrongTax = Array.from(strongElements).some(strong => 
                                            strong.textContent.toLowerCase().includes('tax'));
                                        const hasStrongTotal = Array.from(strongElements).some(strong => 
                                            strong.textContent.toLowerCase().includes('total'));
                                        
                                        // Hide rows that are purely about totals/subtotals/tax, not product rows
                                        if ((rowText.includes('total') || rowText.includes('subtotal') || rowText.includes('tax') || 
                                             hasStrongTax || hasStrongTotal) && 
                                            !rowText.includes('product') && !rowText.includes('item') && !rowText.includes('quantity')) {
                                            row.style.display = 'none';
                                        }
                                    });
                                    
                                    // Handle duration cells with embedded pricing - remove pricing from duration text
                                    const durationCells = confirmationTable.querySelectorAll('td');
                                    durationCells.forEach(cell => {
                                        const originalText = cell.innerHTML;
                                        
                                        // Check if this cell contains duration info with embedded pricing
                                        if (originalText.includes('Day') || originalText.includes('Week') || 
                                            originalText.includes('Month') || originalText.includes('Hour')) {
                                            
                                            // Remove pricing patterns like ($31.44) from the content
                                            let cleanedText = originalText
                                                .replace(/\(\$[\d,]+\.?\d*\)/g, '') // Remove ($31.44) patterns
                                                .replace(/\$[\d,]+\.?\d*/g, '') // Remove $31.44 patterns
                                                .replace(/\s+/g, ' ') // Clean up extra spaces
                                                .trim();
                                            
                                            // Only update if we actually removed pricing content
                                            if (cleanedText !== originalText) {
                                                cell.innerHTML = cleanedText;
                                            }
                                        }
                                    });
                                }
                            }, 100); // Small delay to ensure DOM is updated
                        }
                        
                        enquiry_product_storage.clear(), document.dispatchEvent(new CustomEvent("EnquiryProductsUpdated"));
                        try {
                            EnquiryFlyout.template_flyout_list.render(json.items)
                        } catch { }
                    }
                })
            },
            save_user: function () {
                let inputs = this.html_form.elements,
                    user = {};
                for (let i = 0; i < inputs.length; i++) {
                    let input = inputs[i];
                    input.name && input.name != "name" && input.name != "products" && input.name != "comments" && input.name != "date_requested" && (user[input.name] = input.value)
                }
                enquiry_user_storage.setObject(user)
            },
            toggle_flyout: function () {
                EnquiryFlyout.toggle()
            }
        }
    }(),
    EnquiryProduct = function () {
        return {
            cached_url: !1,
            current_variant_id: !1,
            html_button: !1,
            html_duration_selector: !1,
            html_quantity_selector: !1,
            init: function (current_variant_id = !1) {
                this.html_duration_selector = document.getElementById("js-enquiry-durations"), this.current_variant_id = this.html_duration_selector.dataset.variant;
                let options = document.querySelectorAll("#js-enquiry-durations .option");
                options.forEach(el => {
                    el.dataset.title.includes("Default Title") ? (el.classList.add("selected"), document.getElementById("js-enquiry-duration-fieldgroup").style.display = "none", this.current_variant_id = el.dataset.variantId) : el.value == this.current_variant_id ? (el.selected = !0, this.changePrice(el)) : el.selected = !1
                }), options.forEach(el => {
                    el.value == this.current_variant_id ? (el.selected = !0, this.changePrice(el)) : el.selected = !1
                }), this.html_button = document.getElementById("js-enquiry-request"), document.getElementById("js-enquiry-quantity") && (this.html_quantity_selector = document.getElementById("js-enquiry-quantity"), this.changeQuantity());
                let current_variant = enquiry_product_storage.getVariant(current_variant_id);
                current_variant && (this.html_quantity_selector.value = current_variant.quantity);
                let self = this;
                self.cached_url = window.location.search, setInterval(self.checkVariantQueryString, 500), this.html_button.addEventListener("click", () => {
                    this.addVariantToRequest(), EnquiryFlyout.open()
                }), this.html_duration_selector.addEventListener("click", () => {
                    let option = this.changeVariant();
                    this.changePrice(option).changeQuantity()
                })
            },
            addVariantToRequest: function () {
                let html_duration_selector = document.getElementById("js-enquiry-durations"),
                    selected_variant = document.querySelector(".selected");
                if (!selected_variant) {
                    alert("Please select a rental rate before requesting availability."), this.stopImmediatePropagation();
                    return
                }
                if (variant_id = selected_variant.dataset.variantId, variant = {
                    product_id: this.html_duration_selector.dataset.productid,
                    product: this.html_duration_selector.dataset.title,
                    handle: this.html_duration_selector.dataset.handle,
                    image: this.html_duration_selector.dataset.image,
                    variant_id,
                    variant: selected_variant.dataset.title,
                    price: selected_variant.dataset.unformatted_price,
                    formatted_price: selected_variant.dataset.formatted_price,
                    quantity: 1
                }, this.html_quantity_selector && (variant.quantity = this.html_quantity_selector.value), variant) enquiry_product_storage.editOrAddProduct(variant);
                else return;
                document.dispatchEvent(new CustomEvent("EnquiryProductsUpdated"))
            },
            changeVariant: function () {
                let return_element = !1;
                return document.querySelectorAll("#js-enquiry-durations .option").forEach(el => {
                    el.selected && (this.current_variant_id = el.value, this.setVariantQueryString(this.current_variant_id), return_element = el)
                }), return_element
            },
            changeQuantity: function () {
                let variant2 = enquiry_product_storage.getVariant(this.current_variant_id);
                return variant2 && this.html_quantity_selector ? this.html_quantity_selector.value = variant2.quantity : this.html_quantity_selector.value = 1, this
            },
            changePrice: function (option) {
                return document.querySelector(".js-enquiry-price-wrap") ? (document.querySelector(".js-enquiry-price-wrap small").innerHTML = option.dataset.price, document.querySelector(".js-enquiry-price-wrap .visually-hidden").innerHTML = option.dataset.price, this) : this
            },
            getVariantId: function () {
                let variant_id2 = this.getVariantIdFromQueryString();
                return variant_id2 ? (this.current_variant_id = variant_id2, variant_id2) : this.current_variant_id
            },
            getVariantIdFromQueryString: function () {
                return new URLSearchParams(window.location.search).get("variant") || !1
            },
            checkVariantQueryString: function () {
                window.location.search !== EnquiryProduct.cached_url && (EnquiryProduct.setVariantIdFromQueryString(), EnquiryProduct.cached_url = window.location.search)
            },
            setVariantIdFromQueryString: function () {
                let target_variant_id = new URLSearchParams(window.location.search).get("variant");
                target_variant_id && (EnquiryProduct.current_variant_id = target_variant_id)
            },
            setVariantQueryString: function (id) {
                var url = new URL(window.location.href);
                url.searchParams.set("variant", id), history.pushState({}, "", url.toString())
            }
        }
    }(),
    Enquiry = function () {
        return {
            version: "0.01",
            enquiry_api_url: "https://enquiry.newmediaretailer.com/api/request",
            enquiry_form_url: "/pages/request-availability",
            init: function (options_object) {
                if (options_object.enquiry_form_url !== "undefined" && options_object.enquiry_form_url.length && (this.enquiry_form_url = options_object.enquiry_form_url), options_object.enquiry_api_url !== "undefined" && options_object.enquiry_api_url.length && (this.enquiry_api_url = options_object.enquiry_api_url), EnquiryFlyout.init(), document.getElementById("js-enquiry-product")) {
                    let current_variant_id = window.enquiry_variant_id || !1;
                    if (!current_variant_id && document.getElementById("js-enquiry-durations")) {
                        let selected_option = document.querySelector("#js-enquiry-durations .option[selected=selected]");
                        selected_option && (current_variant_id = selected_option.value)
                    }
                    EnquiryProduct.init(current_variant_id)
                }
                document.getElementById("js-enquiry-request-form") && EnquiryForm.init();
                let enquiry_cart_button = document.getElementById("js-enquiry-cart-button");
                enquiry_cart_button && enquiry_cart_button.addEventListener("click", () => {
                    EnquiryFlyout.open()
                });
                let enquiry_remove_function = function (event) {
                    if (event.target.classList.contains("enquiry-button-remove")) {
                        if (!confirm("Are you sure you want to remove this product from your request?")) return;
                        let index = event.target.parentNode.parentNode.dataset.index;
                        enquiry_product_storage.removeProduct(index), document.dispatchEvent(new Event("EnquiryProductsUpdated"))
                    }
                },
                    enquiry_flyout = document.getElementById("js-enquiry-flyout");
                enquiry_flyout && enquiry_flyout.addEventListener("click", enquiry_remove_function);
                let enquiry_form_product_list = document.getElementById("js-enquiry-form-list");
                enquiry_form_product_list && enquiry_form_product_list.addEventListener("click", enquiry_remove_function), document.dispatchEvent(new CustomEvent("enquiry_loaded"))
            }
        }
    }(),
    EnquiryDurationSelector = function () {
        return {
            current_select_value: !1,
            html_duration_selector: !1,
            init: function () {
                if (this.html_duration_selector = document.getElementById("js-enquiry-durations"), !this.html_duration_selector) return this;
                let current_select_value = this.html_duration_selector.dataset.variant;
                return this.html_duration_selector.addEventListener("click", event => {
                    const target = event.target;
                    if (target.dataset.variantId != this.current_select_value) {
                        document.querySelectorAll(".option").forEach(option2 => {
                            option2.classList.remove("selected")
                        }), target.classList.add("selected"), this.current_select_value = target.dataset.variantId;
                        let option = this.getSelectedOption();
                        document.dispatchEvent(new CustomEvent("EnquiryDurationChange", {
                            bubbles: !0,
                            detail: {
                                data: target.dataset,
                                option: target
                            }
                        }))
                    }
                }), this
            },
            getSelectedOption: function () {
                let options = document.querySelectorAll("#js-enquiry-durations .option"),
                    selected = null;
                return options.forEach(el => {
                    if (el.value == this.current_select_value) return selected = el, el
                }), selected
            }
        }.init()
    }();
document.addEventListener("EnquiryDurationChange", event => {
    let preview_title = document.getElementById("js-enquiry-preview-duration-title");
    preview_title && (preview_title.innerHTML = event.detail.data.title)
});
//# sourceMappingURL=/s/files/1/0509/2766/5342/t/2/assets/enquiry.js.map?v=1718051723