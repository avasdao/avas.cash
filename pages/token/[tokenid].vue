<script setup>
/* Initialize route. */
const route = useRoute()

/* Initialize route. */
const router = useRouter()

/* Set (route) path. */
const value = route?.params.tokenid

/* Set (token display) target. */
const target = `https://nexa.exchange/token/${tokenid.value}`

/* Validate client. */
if (process.client) {
    // NOTE: `window` is ONLY available on client.
    window.location.replace(target)
}
</script>
