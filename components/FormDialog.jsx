/* global process URL */
/* eslint-disable no-alert */
import { withStyles } from '@material-ui/core/styles';
import { useState, useEffect, useContext, useRef, useCallback, useReducer } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import humanize from 'underscore.string/humanize';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createHash } from 'crypto';
import { FeedbackContext } from './Feedback';

export default function FormDialog({
    open,
    setOpen,
    title,
    description,
    fields,
    namespace,
    method,
    url,
    source,
    setSource,
    onSave,
    saveButtonText = 'Save',
}) {
    const [data, updateData] = useReducer((obj1, obj2) => ({ ...obj1, ...obj2 }), {});
    const [active, setActive] = useState(false);
    const [, setFeedback] = useContext(FeedbackContext);
    const [errors, setErrors] = useState({});
    const mapMarker = useRef();

    const getFieldValues = (obj) =>
        Object.keys(fields).reduce(
            (acc, f) => ({ ...acc, [f]: (obj || {})[f] || fields[f].default || '' }),
            {},
        );

    useEffect(() => {
        if (open) {
            updateData(getFieldValues(source));
            setErrors({});
            setActive(false);
        }
    }, [open]);

    const floatRegEx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

    const isFloat = (n) => floatRegEx.test(n);

    const isValidLatLng = (lat, lng) =>
        isFloat(lat) && isFloat(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

    const updateLatLng = (latLng, preventMarkerUpdate) => {
        updateData({
            latitude: latLng.lat.toFixed(3),
            longitude: latLng.lng.toFixed(3),
            preventMarkerUpdate,
        });
    };

    const passwordDigest = (password) =>
        createHash('sha256').update(`${process.env.passwordSalt}${password}`).digest('base64');

    const markerMapContainerRef = useCallback((container) => {
        if (container !== null && typeof window === 'object' && typeof window.L === 'object') {
            const osmBaseLayer = window.L.tileLayer(
                `https://${process.env.osmHost}/{z}/{x}/{y}.png`,
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                },
            );

            const center = [-28.076, 134.003];

            const lMap = window.L.map(container, {
                center,
                zoom: 1,
                scrollWheelZoom: true,
                layers: [osmBaseLayer],
            });

            const divIcon = window.L.divIcon({
                html: '&#9679;',
                className: 'mapicon',
                iconSize: [20, 20],
            });

            const marker = window.L.marker(center, {
                icon: divIcon,
                draggable: true,
                autoPan: true,
                autoPanPadding: [10, 10],
            })
                .addTo(lMap)
                .on('moveend', (e) => {
                    updateLatLng(e.target.getLatLng().wrap(), true);
                });

            mapMarker.current = marker;

            const CustomControl = window.L.Control.extend({
                onAdd: () => {
                    const div = window.L.DomUtil.create('button');
                    div.innerHTML = '&#127968;';
                    div.style.height = '30px';
                    div.style.width = '30px';
                    div.style.backgroundColor = '#FFF';
                    div.style.fontWeight = 'bold';
                    div.onclick = () => {
                        lMap.locate({ setView: false });
                    };
                    return div;
                },
                onRemove: () => {},
            });

            new CustomControl({ position: 'topright' }).addTo(lMap);

            lMap.on('locationfound', (e) => updateLatLng(e.latlng));
        }
    }, []);

    useEffect(() => {
        if (data.preventMarkerUpdate) {
            updateData({ preventMarkerUpdate: false });
        } else {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);
            if (mapMarker.current && isValidLatLng(lat, lng)) {
                mapMarker.current.setLatLng([lat, lng]);
            }
        }
    }, [mapMarker.current, data.latitude, data.longitude]);

    const cancel = () => {
        setOpen(false);
        setActive(false);
    };

    const save = () => {
        setActive(true);
        setErrors({});
        const token =
            (window && window.localStorage && window.localStorage.getItem('userToken')) || '-';
        /* eslint-disable camelcase */
        const { password, password_confirmation } = data;
        const bodyData =
            password || password_confirmation
                ? {
                      ...data,
                      password: password ? passwordDigest(password) : null,
                      password_confirmation: password_confirmation
                          ? passwordDigest(password_confirmation)
                          : null,
                  }
                : { ...data };
        /* eslint-enable camelcase */
        window
            .fetch(new URL(url, process.env.apiHost).href, {
                method: method || 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    utf8: '✓',
                    ...(namespace
                        ? {
                              [namespace]: bodyData,
                          }
                        : bodyData),
                }),
            })
            .then((response) => {
                response
                    .json()
                    .then((body) => {
                        setActive(false);
                        if (response.ok) {
                            setOpen(false);
                            setFeedback({ ok: true, msg: (body && body.message) || 'Success.' });
                            if (setSource) {
                                setSource({
                                    ...source,
                                    ...data,
                                });
                            }
                            if (onSave) {
                                onSave({ data, body });
                            }
                        } else {
                            setFeedback({ ok: false, msg: 'Not saved!' });
                            setErrors(body.errors || {});
                        }
                    })
                    .catch(() => {
                        setActive(false);
                        setFeedback({ ok: false, msg: 'Response error!' });
                    });
            })
            .catch(() => {
                setActive(false);
                setFeedback({ ok: false, msg: 'Request failed!' });
            });
    };

    const WhiteCircularProgress = withStyles({
        root: {
            color: '#FFF',
        },
    })(CircularProgress);

    return (
        <>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open && !active}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {errors && Object.keys(errors).length > 0 && (
                        <Box mb={3}>
                            <Typography variant="body2">
                                Please review and correct these fields:
                                <ul>
                                    {Object.keys(errors).map((k) => (
                                        <li>
                                            {k}: {errors[k].join(', ')}
                                        </li>
                                    ))}
                                </ul>
                            </Typography>
                        </Box>
                    )}
                    {description && (
                        <Box mb={3}>
                            <Typography variant="body2">{description}</Typography>
                        </Box>
                    )}
                    {Object.keys(fields)
                        .filter((k) => fields[k].type !== 'hidden')
                        .map((k) => (
                            <Box key={k} mb={3}>
                                {fields[k].type !== 'checkbox' && (
                                    <>
                                        <TextField
                                            label={fields[k].label || humanize(k)}
                                            type={fields[k].type || 'text'}
                                            inputProps={fields[k].inputProps || {}}
                                            name={k}
                                            value={data[k]}
                                            onChange={(e) => updateData({ [k]: e.target.value })}
                                            error={errors[k] !== undefined}
                                            helperText={
                                                errors[k] !== undefined
                                                    ? errors[k][0]
                                                    : fields[k].helperText
                                            }
                                            placeholder={fields[k].placeholder}
                                            autoFocus={fields[k].autoFocus}
                                            multiline={fields[k].multiline}
                                            InputLabelProps={fields[k].InputLabelProps}
                                            required={fields[k].required}
                                            variant="outlined"
                                            size="small"
                                            style={{ width: '100%' }}
                                            fullWidth
                                        />
                                        {fields[k].markerMap && (
                                            <Box
                                                mt={2}
                                                component={Paper}
                                                elevation={1}
                                                style={{ height: '160px' }}
                                                ref={markerMapContainerRef}
                                            />
                                        )}
                                    </>
                                )}
                                {fields[k].type === 'checkbox' && (
                                    <FormControl
                                        required={fields[k].required}
                                        error={errors[k] !== undefined}
                                    >
                                        <FormControlLabel
                                            label={fields[k].label || humanize(k)}
                                            control={
                                                <Checkbox
                                                    checked={data[k] === '1'}
                                                    onChange={(e) =>
                                                        updateData({
                                                            [k]: e.target.checked ? '1' : '0',
                                                        })
                                                    }
                                                    color="primary"
                                                />
                                            }
                                        />
                                        <FormHelperText>
                                            {errors[k] !== undefined
                                                ? errors[k][0]
                                                : fields[k].helperText}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            </Box>
                        ))}
                    <Box mb={3} style={{ textAlign: 'right' }}>
                        <Button onClick={cancel}>Cancel</Button>{' '}
                        <Button onClick={save}>{saveButtonText}</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Backdrop open={active} style={{ zIndex: 1 }}>
                <WhiteCircularProgress />
            </Backdrop>
        </>
    );
}
